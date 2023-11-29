import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createMentor {
  @ApiProperty({
    description: 'Mentor description',
    nullable: false,
    maxLength: 500,
    example: 'Hola soy tu proximo gran mentor',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  mentorDescription: string;

  @ApiProperty({
    description: 'Mentor fee',
    nullable: false,
    example: '50',
  })
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({
    description: 'Mentor about me',
    nullable: false,
    maxLength: 10000,
    example: 'Hola soy un profesional graduado en...',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  aboutMe: string;

  @ApiProperty({
    description: 'Mentor birthdate',
    nullable: false,
    example: '2023-08-23T03:02:06.086Z',
  })
  @IsDateString()
  birthdate: Date;

  @ApiProperty({
    description: 'Initiative Categories IDs',
    nullable: false,
    example:
      "['4c2b2245-6bf2-4d33-a102-0704657f8b02', '4c2b2245-6bf2-4d33-a102-0704657f8b02']",
  })
  @IsArray()
  Categories: string[];

  @ApiProperty({
    description: 'Mentor Speciality ID',
    nullable: false,
    example: '4c2b2245-6bf2-4d33-a102-0704657f8b02',
  })
  @IsString()
  @IsNotEmpty()
  idSpeciality: string;
}
