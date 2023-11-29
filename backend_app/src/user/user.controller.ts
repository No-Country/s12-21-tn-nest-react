import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './class/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('rol/create')
  async post_categories() {
    const result = await this.userService.create_rol_user();

    if (result) {
      return {
        status: HttpStatus.CREATED,
        message: 'speciality created successfully',
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'error creating speciality',
      };
    }
  }

  @Get('rol/filter')
  async filtrar_rol() {
    return await this.userService.filter_rol_user();
  }

  @Post('create')
  async post_create_user(@Body() user: CreateUser) {
    return await this.userService.post_create_user(user);
  }
}
