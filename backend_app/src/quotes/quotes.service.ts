import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './models/state.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(State) private StateRepository: Repository<State>,
  ) {}
  async getState() {
    try {
      return this.StateRepository.find();
    } catch (error) {
      console.log(error);
    }
  }
  async PostState() {
    const object_state = [
      'disponible',
      'ocupado',
      'Pendiente',
      'Aceptado',
      'Rechazado',
    ];
    let bandera = false;
    for (let index = 0; index < object_state.length; index++) {
      const name = object_state[index];
      const SearchState = await this.StateRepository.findOne({
        where: { name },
      });
      if (!SearchState) {
        const data = this.StateRepository.create({ name });
        await this.StateRepository.save(data);
        bandera = true;
      }
    }
    return bandera;
  }
}
