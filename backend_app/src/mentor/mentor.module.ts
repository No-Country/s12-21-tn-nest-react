import { Module } from '@nestjs/common';
import { MentorController } from './mentor.controller';
import { MentorService } from './mentor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './models/categories.entity';
import { Mentor } from './models/mentor.entity';
import { Speciality } from './models/especializaciones';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Mentor, Speciality])],
  controllers: [MentorController],
  providers: [MentorService],
  exports: [MentorService],
})
export class MentorModule {}
