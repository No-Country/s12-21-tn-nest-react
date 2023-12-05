import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './models/gateway.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { createConsultaDto } from './dto/create-consulta.dto';
import { Consulta } from './models/consulta.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { Alumn } from 'src/alunm/models/alumn.entity';
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Consulta)
    private consultaRepository: Repository<Consulta>,
    @InjectRepository(Mentor) private mentorRepository: Repository<Mentor>,
    @InjectRepository(Alumn) private alumnRepository: Repository<Alumn>,
  ) {}

  createMessage(message: CreateMessageDto) {
    //aca guardar la consulta
    return this.messageRepository.save(message);
  }
  getMessages() {
    return this.messageRepository.find();
  }
  getMessage(id: number) {
    return this.messageRepository.findOne({
      where: { id: id },
    });
  }
  deleteMessage(id: number) {
    return this.messageRepository.delete({ id });
  }
  updateMessage(id: number, message: UpdateMessageDto) {
    return this.messageRepository.update({ id }, message);
  }
  async createConsulta(id: number, consulta: createConsultaDto) {
    const messageFound = await this.messageRepository.findOne({
      where: { id },
    });
    if (!messageFound) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    const newConsult = this.consultaRepository.create(consulta);
    const savedConsult = await this.consultaRepository.save(newConsult);
    messageFound.consulta = savedConsult;

    return this.messageRepository.save(messageFound);
  }
  async sendMessage(id1: string, id2: string, newMessage: CreateMessageDto) {
    const alumnFound = await this.alumnRepository.findOne({
      where: { id: id1 },
    });
    const mentorFound = await this.mentorRepository.findOne({
      where: { id: id2 },
    });

    if (!alumnFound || !mentorFound) {
      throw new HttpException(
        'Alumn or Mentor not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const consulta = new Consulta();
    consulta.status = false; // O el valor que prefieras
    await this.consultaRepository.save(consulta);

    const message = new Message();
    message.message = newMessage.message;
    message.sender = id1;
    message.receiver = id2;
    message.date = new Date();
    message.status = 'unread';
    message.consulta = consulta;

    await this.messageRepository.save(message);

    return `Mensaje enviado desde ${id1} a ${id2}`;
  }
}
