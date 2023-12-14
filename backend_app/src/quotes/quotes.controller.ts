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
}
