import { IsString, IsOptional } from 'class-validator';

export class updateCategories {
  @IsString()
  @IsOptional()
  name?: string;
}
