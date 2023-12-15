import { Controller, Get, HttpStatus } from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private repositoryService: QuotesService) {}
  @Get('state')
  async get_state() {
    return this.repositoryService.getState();
  }
  @Get('state/creates')
  async post_state() {
    if (await this.repositoryService.PostState()) {
      return {
        status: HttpStatus.CREATED,
        message: 'Estado Cargado Correctamente',
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Los estado ya se enceuntra cargado',
      };
    }
  }
  @Get('hour')
  async get_hour() {
    return await this.repositoryService.getScheduler();
  }
  @Get('hour/create')
  async post_hour() {
    if (await this.repositoryService.postScheduler()) {
      return {
        status: HttpStatus.CREATED,
        message: 'Las horas fueron cargadadas correctamente',
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Las hora ya se encuentran cargada correctamente',
      };
    }
  }
  @Get('days')
  async get_days() {
    return await this.repositoryService.getDays();
  }
  @Get('days/create')
  async post_days() {
    if (await this.repositoryService.postDays()) {
      return {
        status: HttpStatus.CREATED,
        message: 'Los dias fueron cargadadas correctamente',
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Los dias ya se encuentran cargada correctamente',
      };
    }
  }
}
