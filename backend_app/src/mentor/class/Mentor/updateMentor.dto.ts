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
  birthdate?: string;
  @IsOptional()
  categories?: string[];
  @IsOptional()
  speciality?: string;
  @IsOptional()
  @IsString()
  firstName?: string;
  @IsOptional()
  @IsString()
  lastName?: string;
  @IsString()
  @IsOptional()
  password?: string;
  @IsString()
  @IsOptional()
  phone?: string;
}
