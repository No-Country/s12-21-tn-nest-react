import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';


@WebSocketGateway(81, { cors: {
  origin: '*',
}})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: any) {
    console.log("Socket iniciado...");
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Alguien se conectó...', client, args);
  }

  handleDisconnect(client: any) {
    console.log('Alguien se desconectó...', client);
  }
@SubscribeMessage('join_room')
handleJoinRoom(client: any, room: string) {
  client.joinRoom(`room_${room}`);
}


  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
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
  sendMessage(message: CreateMessageDto){
    this.chatService.sendMessage(message);
  }

  @SubscribeMessage('message')
  updateMessage(message: UpdateMessageDto){
    this.chatService.updateMessage(message);
  }

}
