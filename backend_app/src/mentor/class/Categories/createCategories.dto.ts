import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class createCategories {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;
}
