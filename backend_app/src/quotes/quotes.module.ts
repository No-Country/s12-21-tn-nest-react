import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './models/state.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { Scheduler } from './models/schedule.entity';
import { Days } from './models/days.entity';
import { Availability } from './models/availability.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([State, Mentor, Scheduler, Days, Availability]),
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
