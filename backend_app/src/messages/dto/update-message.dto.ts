import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  message: string;
  @IsString()
  @IsOptional()
  sender?: string;
  @IsString()
  @IsOptional()
  receiver?: string;
  /* @IsBoolean()
  status: string; */
}
