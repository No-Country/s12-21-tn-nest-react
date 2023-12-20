import { Module, forwardRef } from '@nestjs/common';
import { AlunmController } from './alunm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumn } from './models/alumn.entity';
import { AlumnHireMentor } from './models/alumnHireMentor.entity';
import { Category } from 'src/mentor/models/categories.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { AlumnService } from './alunm.service';
import { User } from 'src/auth/user/entities/user.entity';
import { UserService } from 'src/auth/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alumn, AlumnHireMentor, Category, Mentor, User]),
  ],
  controllers: [AlunmController],
  providers: [AlumnService, UserService],
  exports: [AlumnService],
})
export class AlunmModule {}
