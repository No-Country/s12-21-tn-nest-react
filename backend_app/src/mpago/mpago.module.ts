import { Module } from '@nestjs/common';
import { MpagoService } from './mpago.service';
import { MpagoController } from './mpago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mpago } from './entities/mpago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mpago])],
  controllers: [MpagoController],
  providers: [MpagoService],
})
export class MpagoModule {}
