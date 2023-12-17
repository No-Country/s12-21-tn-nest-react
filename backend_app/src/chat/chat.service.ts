import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Alumn } from 'src/alunm/models/alumn.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Alumn) private alumnRepository: Repository<Alumn>,
    @InjectRepository(Mentor) private mentorRepository: Repository<Mentor>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    try {
      const chat = await this.chatRepository.findOne({
        where: {
          id: this.formatChatId(createChatDto.alumnId, createChatDto.mentorId),
        },
      });

      if (chat) {
        return chat;
      }

      const chatToSave = this.chatRepository.create(createChatDto);
      chatToSave.id = this.formatChatId(
        chatToSave.alumnId,
        chatToSave.mentorId,
      );
      this.chatRepository.save(chatToSave);
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
        relations: ['userOne', 'userTwo'],
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

  sendMessage(message: CreateMessageDto) {
    return `This action sends this message '${message}' to a chat`;
  }

  updateMessage(message: UpdateMessageDto) {
    return `This action modify a message with Id ${message.id} by this new content '${message}' of a chat`;
  }
}
