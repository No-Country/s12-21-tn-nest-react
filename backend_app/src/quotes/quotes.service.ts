import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './models/state.entity';
import { add_list_in_model } from '../functions/General';
import { createQuotes } from './class/quotes.dto';
import { Quotes } from './models/quotes.entity';
import { create_object_quotes } from 'src/functions/DeepPartial';
import { refuser } from './class/quotesRefuser.dto';
import { Accept } from './class/quotesAccept.dto';
import { AlumnService } from 'src/alunm/alunm.service';
import { qualify, qualifyMentor } from 'src/Config/nodeMailer';
import { Alumn } from 'src/alunm/models/alumn.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import {
  alumnoDescription,
  descriptionMentors,
  url,
} from 'src/functions/constant';
@Injectable()
export class QuotesService {
  constructor(
    private readonly alumnService: AlumnService,
    @InjectRepository(State) private StateRepository: Repository<State>,
    @InjectRepository(Quotes) private QuoteRepository: Repository<Quotes>,
    @InjectRepository(Alumn) private alumnRepository: Repository<Alumn>,
    @InjectRepository(Mentor) private mentorRepository: Repository<Mentor>,
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
    const hirmentor = await this.alumnService.saveMentorHire(
      post.alumnId,
      post.mentorId,
    );
    post['alumnoHireMentor'] = hirmentor;
    post['state'] = dato.id;
    const object = await create_object_quotes(post, hirmentor.id);
    if (dato) {
      // email: string,
      // description: string,
      // link: string,
      const alumnoEmail = await this.alumnRepository.findOne({
        where: { id: post.alumnId },
        relations: {
          user: true,
        },
      });
      const mentorEmail = await this.mentorRepository.findOne({
        where: { id: post.mentorId },
        relations: {
          userId: true,
        },
      });
      const nombreAlumno = `${alumnoEmail.user.firstName} ${alumnoEmail.user.lastName}`;
      const nombreMentor = `${mentorEmail.userId.firstName} ${mentorEmail.userId.lastName}`;
      const descriptionAlumn = alumnoDescription(nombreAlumno);
      const descriptionMentor = descriptionMentors(nombreMentor);
      await qualify(alumnoEmail.user.email, descriptionAlumn, url);
      await qualifyMentor(mentorEmail.userId.email, descriptionMentor);
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
        state: true,
        alumn: true,
        alumnoHireMentor: true,
      },
    });
    if (datosMentor.length > 0) return datosMentor;
    const datosAlumn = await this.QuoteRepository.find({
      where: {
        state: { id: datoStatus.id },
        alumn: { id: idUser },
      },
      relations: {
        mentor: true,
        state: true,
        alumn: true,
        alumnoHireMentor: true,
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
        state: true,
        alumn: true,
        alumnoHireMentor: true,
      },
    });
    if (datosMentor.length > 0) return datosMentor;
    const datosAlumn = await this.QuoteRepository.find({
      where: {
        state: { id: datoStatus.id },
        alumn: { id: idUser },
      },
      relations: {
        mentor: true,
        state: true,
        alumn: true,
        alumnoHireMentor: true,
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
        state: true,
        alumn: true,
        alumnoHireMentor: true,
      },
    });
    if (datosMentor.length > 0) return datosMentor;
    const datosAlumn = await this.QuoteRepository.find({
      where: {
        state: { id: datoStatus.id },
        alumn: { id: idUser },
      },
      relations: {
        mentor: true,
        state: true,
        alumn: true,
        alumnoHireMentor: true,
      },
    });
    if (datosAlumn.length > 0) return datosAlumn;
    return [];
  }
  async get_quotes_all(idUser: string) {
    const datosMentor = await this.QuoteRepository.find({
      where: {
        mentor: { id: idUser },
      },
      relations: {
        mentor: true,
        state: true,
        alumn: true,
        alumnoHireMentor: true,
      },
    });
    if (datosMentor.length > 0) return datosMentor;
    const datosAlumn = await this.QuoteRepository.find({
      where: {
        alumn: { id: idUser },
      },
      relations: {
        mentor: true,
        state: true,
        alumn: true,
        alumnoHireMentor: true,
      },
    });
    if (datosAlumn.length > 0) return datosAlumn;
    return [];
  }
  async quotes_update(idQuotes: string, accept: Accept) {
    const quotes = await this.QuoteRepository.findOne({
      where: {
        id: idQuotes,
      },
      relations: {
        state: true,
      },
    });
    const status = await this.StateRepository.findOne({
      where: { name: 'aceptado' },
    });

    if (quotes && quotes.state.name !== 'pendiente')
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'la cita no se encuentra en estado pendiente',
      };

    quotes.state = status;
    quotes.textTime = accept['hour'];
    this.QuoteRepository.save(quotes);

    return {
      status: HttpStatus.ACCEPTED,
      message: 'citas aceptada correctamente',
    };
  }
  async quotes_refused(idQuotes: string, refuser: refuser) {
    try {
      const quotes = await this.QuoteRepository.findOne({
        where: {
          id: idQuotes,
        },
        relations: {
          state: true,
        },
      });
      const state = await this.StateRepository.findOne({
        where: { name: 'rechazado' },
      });

      if (quotes && quotes.state.name === 'rechazado')
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'la cita ya se encuentra rechazada',
        };

      quotes.textRejection = refuser['refused'];
      quotes.state = state;
      await this.QuoteRepository.save(quotes);
      return {
        status: HttpStatus.ACCEPTED,
        message: 'citas fue rechazada correctamente correctamente',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
