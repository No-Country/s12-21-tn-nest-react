import { IsBoolean, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message: string;
  /*
  @IsString()
  sender: string;
  @IsString()
  receiver: string;
  @IsBoolean()
  status: string; */
}
