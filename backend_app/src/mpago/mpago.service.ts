import { Injectable } from '@nestjs/common';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';

@Injectable()
export class MpagoService {
  create(createMpagoDto: CreateMpagoDto) {
    return 'This action adds a new mpago';
  }

  findAll() {
    return `This action returns all mpago`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mpago`;
  }

  update(id: number, updateMpagoDto: UpdateMpagoDto) {
    return `This action updates a #${id} mpago`;
  }

  remove(id: number) {
    return `This action removes a #${id} mpago`;
  }
}
