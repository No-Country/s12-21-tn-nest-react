import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', //frontend url
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  private mapUserIdToSocket = new Map<string, Socket>();
  private readonly logger = new Logger(ChatGateway.name);
  @WebSocketServer() server;

  private addSocketIdToMap(userId: string, socket: Socket) {
    this.mapUserIdToSocket.set(userId, socket);
  }

  private removeSocketIdFromMap(userId: string) {
    this.mapUserIdToSocket.delete(userId);
  }

  private getUserIdFromToken(token: string) {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64').toString();
    const jsonPayload = JSON.parse(payload);
    return jsonPayload.userId;
  }

  handleDisconnect(client: any) {
    const userId = this.getUserIdFromToken(client.handshake.auth.token);
    this.removeSocketIdFromMap(userId);
    this.logger.log('Socket disconected ', userId);
    return 'disconnected';
  }

  handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.auth.token;
    if (!token) {
      client.disconnect();
      return 'disconnected';
    }

    const userId = this.getUserIdFromToken(token);
    this.addSocketIdToMap(userId, client);
    this.logger.log('Socket connected ', userId);
    return 'connected';
  }
  afterInit(server: any) {
    this.logger.log('Server initialized');
  }

  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto) {
    const chat = await this.chatService.create(createChatDto);
    console.log(chat);
    this.server.emit('chatCreated', JSON.parse(JSON.stringify(chat)));
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }

  @SubscribeMessage('message')
  sendMessage(message: CreateMessageDto) {
    this.chatService.sendMessage(message);
  }

  @SubscribeMessage('message')
  updateMessage(message: UpdateMessageDto) {
    this.chatService.updateMessage(message);
  }
}
