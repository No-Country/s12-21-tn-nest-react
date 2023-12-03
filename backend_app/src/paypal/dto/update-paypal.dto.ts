import { PartialType } from '@nestjs/swagger';
import { CreatePaypalOrderDto } from './create-paypal.dto';

export class UpdatePaypalDto extends PartialType(CreatePaypalOrderDto) {}
