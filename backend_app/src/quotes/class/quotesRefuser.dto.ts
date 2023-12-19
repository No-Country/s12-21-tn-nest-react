import { IsNotEmpty, IsString } from 'class-validator';

export class refuser {
  @IsString()
  @IsNotEmpty()
  refused: string;
}
