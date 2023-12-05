import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './gateway.services';
@WebSocketGateway({
  cors: { origin: '*' },
})
export class MyGateway implements OnModuleInit {
  constructor(private messageService: MessagesService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    const newBody = {
      message: 'prueba de guardar en la db',
      sender: 'Cris',
      receiver: 'Test receiver',
    };
    this.messageService.createMessage(newBody);

    this.server.emit('onMessage', {
      msg: 'New message',
      content: body,
    });
  }
}
