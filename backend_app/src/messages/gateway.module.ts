import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MessagesController } from './gateway.controller';
import { MessagesService } from './gateway.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/gateway.entity';
import { Consulta } from './models/consulta.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { Alumn } from 'src/alunm/models/alumn.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Consulta, Mentor, Alumn])],
  controllers: [MessagesController],
  providers: [MessagesService, MyGateway],
})
export class GatewayModule {}
