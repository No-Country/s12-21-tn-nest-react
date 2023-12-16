import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ErrorManager extends Error {
  public errors = {
    QueryFailedError: 400,
    BadRequestException: 400,
    NotFoundException: 404,
  };

  constructor() {
    super();
  }

  public errorHandler(error: Error) {
    if (this.errors[error.name] === 400) {
      throw new BadRequestException(error.message);
    }

    if (this.errors[error.name] === 404) {
      throw new NotFoundException(error.message);
    }
  }
}
