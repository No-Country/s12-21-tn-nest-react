import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './models/state.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { Quotes } from './models/quotes.entity';
import { AlunmModule } from '../alunm/alunm.module';
import { Alumn } from 'src/alunm/models/alumn.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([State, Mentor, Quotes, Alumn]),
    AlunmModule,
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
