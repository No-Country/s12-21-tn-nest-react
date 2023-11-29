import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './gateway.services';
import { Message } from './models/gateway.entity';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}
  @Get()
  getMessages(): Promise<Message[]> {
    return this.messageService.getMessages();
  }
  @Get('message/:id')
  getMessage(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.getMessage(id);
  }
  @Delete('message/:id')
  deleteMessage(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.deleteMessage(id);
  }
  @Post()
  createMessage(@Body() newMessage: CreateMessageDto) {
    return this.messageService.createMessage(newMessage);
  }
  @Patch('message/:id')
  updateMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() message: UpdateMessageDto,
  ) {
    console.log(typeof id, typeof message);
    return this.messageService.updateMessage(id, message);
  }
}
