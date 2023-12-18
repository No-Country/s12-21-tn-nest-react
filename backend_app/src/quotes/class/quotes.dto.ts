import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class createQuotes {
  @IsNotEmpty()
  @IsString()
  mentorId: string;
  @IsNotEmpty()
  @IsString()
  alumnId: string;
  @IsDateString()
  @IsNotEmpty()
  appointmentDate: string;
}
