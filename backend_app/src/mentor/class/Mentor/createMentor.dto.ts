import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsArray,
} from 'class-validator';

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
}
