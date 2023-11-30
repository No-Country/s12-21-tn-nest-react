import { PartialType } from '@nestjs/swagger';
import { createMentor } from './createMentor.dto';

export class updateMentor extends PartialType(createMentor) {}
