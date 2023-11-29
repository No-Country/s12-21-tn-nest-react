import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class CreateUser {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  correo: string;
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
  @IsNotEmpty()
  @IsString()
  rolId: string;
}
