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
    example: '1995-08-23T03:02:06.086Z',
  })
  @IsDateString()
  birthdate: Date;

  @ApiProperty({
    description: 'Initiative Categories IDs',
    nullable: false,
    example:
      '["dafa3a53-8e51-11ee-8680-fcaa14c77543", "ec5cb9d7-8e51-11ee-8680-fcaa14c77543"]',
  })
  @IsArray()
  Categories: string[];

  @ApiProperty({
    description: 'Mentor Speciality ID',
    nullable: false,
    example: '0af348af-8e52-11ee-8680-fcaa14c77543',
  })
  @IsString()
  @IsNotEmpty()
  idSpeciality: string;

  @ApiProperty({
    description: 'Mentor photo',
    type: 'string',
    format: 'binary',
  })
  file: any;
}
