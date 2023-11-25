import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator';

export class createMentor {
  @IsNotEmpty()
  @IsString()
  @MinLength(200)
  @MaxLength(500)
  mentorDescription: string;
  @IsNotEmpty()
  @IsString()
  price: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(400)
  @MaxLength(10000)
  aboutMe: string;
  @IsDate()
  birthdate: Date;
  @IsNotEmpty()
  idCategories: string[];
}
