import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { createQuotes } from './class/quotes.dto';

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
  @Post('create')
  async create_quotes(@Body() post: createQuotes) {
    return this.repositoryService.postQuotes(post);
  }
  @Get('filter/accept/:id')
  async get_quotes_accept(@Param('id') idUser: string) {
    return this.repositoryService.get_quotes_accept(idUser);
  }
  @Get('filter/refused/:id')
  async get_quotes_refused(@Param('id') idUser: string) {
    return this.repositoryService.get_quotes_refused(idUser);
  }
  @Get('filter/pending/:id')
  async get_quotes_pending(@Param('id') idUser: string) {
    return this.repositoryService.get_quotes_pending(idUser);
  }
  @Get('filter/all/:id')
  async get_quotes_all(@Param('id') idUser: string) {
    return this.repositoryService.get_quotes_all(idUser);
  }
  @Patch('update/:id')
  async get_quotes_update(@Param('id') idQuotes: string) {
    return this.repositoryService.quotes_update(idQuotes);
  }
}
