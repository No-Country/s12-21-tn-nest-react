import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Alumn } from 'src/alunm/models/alumn.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Alumn) private alumnRepository: Repository<Alumn>,
    @InjectRepository(Mentor) private mentorRepository: Repository<Mentor>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    try {
      const chat = await this.chatRepository.findOne({
        where: [
          {
            alumnId: createChatDto.alumnId,
            mentorId: createChatDto.mentorId,
          },
          {
            alumnId: createChatDto.mentorId,
            mentorId: createChatDto.alumnId,
          },
        ],
        relations: ['mentor', 'alumn'],
      });

      if (chat) {
        return { ...chat };
      }

      const chatToSave = this.chatRepository.create(createChatDto);

      //save and return relationship
      const created = await this.chatRepository.save(chatToSave);

      const mentor = await this.mentorRepository.findOne({
        where: { userId: { id: createChatDto.mentorId } },
      });

      const alumn = await this.alumnRepository.findOne({
        where: { user: { id: createChatDto.alumnId } },
      });

      return { ...created, mentor, alumn };
    } catch (error) {
      console.log(error);
    }
  }

  private formatChatId(idOne: string, idTwo: string) {
    return `${idOne}-${idTwo}`;
  }

  findAll() {
    return `This action returns all chat`;
  }

  async getChatsByUserId(id: string) {
    try {
      return await this.chatRepository.find({
        where: [{ alumnId: id }, { mentorId: id }],
        relations: ['mentor', 'alumn'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  async saveMessage(message) {
    try {
      const messageToSave = this.messageRepository.create(message);
      const saved = await this.messageRepository.save(messageToSave);

      const temp = await this.mentorRepository.findOne({
        where: { userId: { id: message.senderId } },
      });

      const sender = temp
        ? temp
        : await this.alumnRepository.findOne({
            where: { user: { id: message.senderId } },
          });
      console.log({ ...saved, sender });
      return { ...saved, sender };
    } catch (error) {
      console.log(error);
    }
  }

  updateMessage(message: UpdateMessageDto) {
    return `This action modify a message with Id ${message.id} by this new content '${message}' of a chat`;
  }
}
