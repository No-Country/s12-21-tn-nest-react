import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { MentorService } from 'src/mentor/mentor.service';
import { MentorModule } from 'src/mentor/mentor.module';
import { Category } from 'src/mentor/models/categories.entity';
import { Speciality } from 'src/mentor/models/especializaciones';

@Module({
  imports: [
  TypeOrmModule.forFeature([User, Role, Mentor, Category, Speciality]),
  UserModule,
  RoleModule,
  MentorModule
  ],
  controllers: [AuthController],
  providers: [AuthService,
              UserService,
              JwtService,
              MentorService],

})
export class AuthModule {}
