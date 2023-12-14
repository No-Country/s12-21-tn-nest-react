import { Module } from '@nestjs/common';
import { MpagoService } from './mpago.service';
import { MpagoController } from './mpago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mpago } from './entities/mpago.entity';
import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mpago, AlumnHireMentor])],
  controllers: [MpagoController],
  providers: [MpagoService],
})
export class MpagoModule {}
