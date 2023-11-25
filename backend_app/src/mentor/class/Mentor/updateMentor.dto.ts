import { IsString, IsDate, IsOptional } from 'class-validator';

export class updateMentor {
  @IsString()
  @IsOptional()
  mentorDescription: string;
  @IsString()
  @IsOptional()
  price: string;
  @IsString()
  @IsOptional()
  aboutMe: string;
  @IsOptional()
  @IsDate()
  birthdate: Date;
  @IsOptional()
  idCategories: string[];
}
