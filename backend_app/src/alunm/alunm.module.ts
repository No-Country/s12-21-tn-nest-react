import { Module } from '@nestjs/common';
import { AlunmController } from './alunm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumn } from './models/alumn.entity';
import { AlumnHireMentor } from './models/alumnHireMentor.entity';
import { AlunmService } from './alunm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alumn, AlumnHireMentor])],
  controllers: [AlunmController],
  providers: [AlunmService],
})
export class AlunmModule {}
