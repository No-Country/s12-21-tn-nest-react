import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsArray,
  IsObject,
} from 'class-validator';
import { User } from 'src/auth/user/entities/user.entity';

export class createMentor {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  mentorDescription: string;
  @IsNotEmpty()
  @IsString()
  price: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  aboutMe: string;
  @IsDateString()
  birthdate: Date;
  @IsArray()
  Categories: string[];
  @IsString()
  @IsNotEmpty()
  idSpeciality: string;
  user: User;
}
