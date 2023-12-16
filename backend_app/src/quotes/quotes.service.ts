import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './models/state.entity';
import { Scheduler } from './models/schedule.entity';
import { add_list_in_model } from 'src/functions/general';
import { Days } from './models/days.entity';
import { order_days } from 'src/functions/Consulta';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(State) private StateRepository: Repository<State>,
    @InjectRepository(Scheduler)
    private SchedulerRepostiory: Repository<Scheduler>,
    @InjectRepository(Days) private daysRepository: Repository<Days>,
  ) {}
  async getState() {
    try {
      return await this.StateRepository.find();
    } catch (error) {
      console.log(error);
    }
  }
  async PostState() {
    const object_state = [
      'disponible',
      'ocupado',
      'pendiente',
      'aceptado',
      'rechazado',
    ];
    return await add_list_in_model(object_state, this.StateRepository);
  }
  async getScheduler() {
    try {
      const hour_order = await this.SchedulerRepostiory.find();
      const sortedData = hour_order.sort((a, b) => {
        const timeA = parseInt(a.name.split(':')[0]);
        const timeB = parseInt(b.name.split(':')[0]);

        return timeA - timeB;
      });
      return sortedData;
    } catch (error) {
      console.log(error);
    }
  }

  async postScheduler() {
    const object_hour = [
      '8:00 a 9:00',
      '9:00 a 10:00',
      '10:00 a 11:00',
      '11:00 a 12:00',
      '12:00 a 13:00',
      '13:00 a 14:00',
      '14:00 a 15:00',
      '15:00 a 16:00',
      '16:00 a 17:00',
      '17:00 a 18:00',
      '18:00 a 19:00',
      '19:00 a 20:00',
      '20:00 a 21:00',
      '21:00 a 22:00',
      '22:00 a 23:00',
      '23:00 a 00:00',
    ];
    return await add_list_in_model(object_hour, this.SchedulerRepostiory);
  }
  async postDays() {
    try {
      const object_day = [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabados',
        'domingos',
      ];
      return await add_list_in_model(object_day, this.daysRepository);
    } catch (error) {
      console.log(error);
    }
  }
  async getDays() {
    return await order_days(this.daysRepository);
  }
}
