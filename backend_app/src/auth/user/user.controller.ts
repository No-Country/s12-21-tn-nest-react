import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Auth } from '../../common/decorator/auth.decorator';
import { ERole } from '../../common/enum';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Auth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.createMentor(createUserDto);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await this.userService.findAll(pagination);
  }

  @Auth(ERole.MENTOR, ERole.STUDENT)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
