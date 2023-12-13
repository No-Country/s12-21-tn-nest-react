import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class ChatService {
  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  sendMessage(message: CreateMessageDto){
    return `This action sends this message '${message}' to a chat`;
  }

  updateMessage(message: UpdateMessageDto){
    return `This action modify a message with Id ${message.id} by this new content '${message}' of a chat`;
  }

}
