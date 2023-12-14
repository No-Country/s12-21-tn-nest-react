import { PartialType } from '@nestjs/swagger';
import { CreateMpagoDto } from './create-mpago.dto';

export class UpdateMpagoDto extends PartialType(CreateMpagoDto) {}
