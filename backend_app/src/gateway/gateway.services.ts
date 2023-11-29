import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './models/gateway.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { createConsultaDto } from './dto/create-consulta.dto';
import { Consulta } from './models/consulta.entity';
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Consulta)
    private consultaRepository: Repository<Consulta>,
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
}
