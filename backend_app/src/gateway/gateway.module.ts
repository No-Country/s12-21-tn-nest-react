import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MessagesController } from './gateway.controller';
import { MessagesService } from './gateway.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/gateway.entity';
import { Consulta } from './models/consulta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Consulta])],
  controllers: [MessagesController],
  providers: [MessagesService, MyGateway],
})
export class GatewayModule {}
