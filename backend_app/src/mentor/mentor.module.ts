import { Module } from '@nestjs/common';
import { MentorController } from './mentor.controller';
import { MentorService } from './mentor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './models/categories.entity';
import { Mentor } from './models/mentor.entity';
import { MentorCategory } from './models/mentorCategories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Mentor, MentorCategory])],
  controllers: [MentorController],
  providers: [MentorService],
})
export class MentorModule {}
