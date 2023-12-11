import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './user/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/mentor')
  @UseInterceptors(FileInterceptor('file'))
  async mentorRegister(
    @Body() registerDto: RegisterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.authService.mentorRegister(registerDto, file);
  }

  @Post('register/student')
  @UseInterceptors(FileInterceptor('file'))
  async studentRegister(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.authService.studentRegister(createUserDto, file);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
