import { Module } from '@nestjs/common';
import { MpagoService } from './mpago.service';
import { MpagoController } from './mpago.controller';

@Module({
  controllers: [MpagoController],
  providers: [MpagoService],
})
export class MpagoModule {}
