import { Module } from '@nestjs/common';
import { AlunmController } from './alunm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumn } from './models/alumn.entity';
import { AlumnHireMentor } from './models/alumnHireMentor.entity';
import { Category } from 'src/mentor/models/categories.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { AlumnService } from './alunm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alumn, AlumnHireMentor, Category, Mentor]),
  ],
  controllers: [AlunmController],
  providers: [AlumnService],
  exports: [AlumnService],
})
export class AlunmModule {}
