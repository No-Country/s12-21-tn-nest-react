import { IsNotEmpty, IsString } from 'class-validator';

export class Accept {
  @IsString()
  @IsNotEmpty()
  hour: string;
}
