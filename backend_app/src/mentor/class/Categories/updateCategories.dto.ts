import { PartialType } from '@nestjs/swagger';
import { createCategories } from './createCategories.dto';

export class updateCategories extends PartialType(createCategories) {}
