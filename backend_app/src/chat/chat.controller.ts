import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('by-user/:id')
  async getChatsByUserId(@Param('id') id: string) {
    return await this.chatService.getChatsByUserId(id);
  }
}
