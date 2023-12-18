import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './models/state.entity';
import { add_list_in_model } from 'src/functions/general';
import { createQuotes } from './class/quotes.dto';
import { Quotes } from './models/quotes.entity';
import { create_object_quotes } from 'src/functions/DeepPartial';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(State) private StateRepository: Repository<State>,
    @InjectRepository(Quotes) private QuoteRepository: Repository<Quotes>,
  ) {}
  async getState() {
    try {
      return await this.StateRepository.find();
    } catch (error) {
      console.log(error);
    }
  }
  async PostState() {
    const object_state = ['pendiente', 'aceptado', 'rechazado'];
    return await add_list_in_model(object_state, this.StateRepository);
  }
  async postQuotes(post: createQuotes) {
    const dato = await this.StateRepository.findOne({
      where: { name: 'pendiente' },
    });
    post['state'] = dato.id;
    const object = await create_object_quotes(post);
    if (dato) {
      const quotes = this.QuoteRepository.create(object);
      await this.QuoteRepository.save(quotes);
      return {
        status: HttpStatus.CREATED,
        message: 'quotes saved successfully',
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'id status not found',
      };
    }
  }
  async get_quotes_accept(idUser: string) {
    const datoStatus = await this.StateRepository.findOne({
      where: { name: 'aceptado' },
    });
    const datosMentor = await this.QuoteRepository.find({
      where: {
        mentor: { id: idUser },
        state: { id: datoStatus.id },
      },
      relations: {
        mentor: true,
      },
    });
    if (datosMentor.length > 0) return datosMentor;
    const datosAlumn = await this.QuoteRepository.find({
      where: {
        state: { id: datoStatus.id },
        alumn: { id: idUser },
      },
      relations: {
        alumn: true,
      },
    });
    if (datosAlumn.length > 0) return datosAlumn;
    return [];
  }
  async get_quotes_refused(idUser: string) {
    const datoStatus = await this.StateRepository.findOne({
      where: { name: 'rechazado' },
    });
    const datosMentor = await this.QuoteRepository.find({
      where: {
        mentor: { id: idUser },
        state: { id: datoStatus.id },
      },
      relations: {
        mentor: true,
      },
    });
    if (datosMentor.length > 0) return datosMentor;
    const datosAlumn = await this.QuoteRepository.find({
      where: {
        state: { id: datoStatus.id },
        alumn: { id: idUser },
      },
      relations: {
        alumn: true,
      },
    });
    if (datosAlumn.length > 0) return datosAlumn;
    return [];
  }
  async get_quotes_pending(idUser: string) {
    const datoStatus = await this.StateRepository.findOne({
      where: { name: 'pendiente' },
    });
    const datosMentor = await this.QuoteRepository.find({
      where: {
        mentor: { id: idUser },
        state: { id: datoStatus.id },
      },
      relations: {
        mentor: true,
      },
    });
    if (datosMentor.length > 0) return datosMentor;
    const datosAlumn = await this.QuoteRepository.find({
      where: {
        state: { id: datoStatus.id },
        alumn: { id: idUser },
      },
      relations: {
        alumn: true,
      },
    });
    if (datosAlumn.length > 0) return datosAlumn;
    return [];
  }
  async get_quotes_all(idUser: string) {
    const datoStatus = await this.StateRepository.findOne({
      where: { name: 'pendiente' },
    });
    const datosMentor = await this.QuoteRepository.find({
      where: {
        state: { id: datoStatus.id },
      },
      relations: {
        mentor: true,
      },
    });
    if (datosMentor.length > 0) return datosMentor;
    const datosAlumn = await this.QuoteRepository.find({
      where: {
        alumn: { id: idUser },
      },
      relations: {
        alumn: true,
      },
    });
    if (datosAlumn.length > 0) return datosAlumn;
    return [];
  }
  async quotes_update(idQuotes: string) {
    const quotes = await this.QuoteRepository.findOne({
      where: {
        id: idQuotes,
      },
      relations: {
        state: true,
      },
    });

    return quotes;
  }
}
