import { IsString, IsOptional, IsDateString } from 'class-validator';

export class updateMentor {
  @IsString()
  @IsOptional()
  mentorDescription?: string;
  @IsString()
  @IsOptional()
  price?: string;
  @IsString()
  @IsOptional()
  aboutMe?: string;
  @IsOptional()
  @IsDateString()
  birthdate?: Date;
  @IsOptional()
  categories?: string[];
  @IsOptional()
  speciality?: string;
}
