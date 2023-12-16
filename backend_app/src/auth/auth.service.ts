import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET, SALT_ROUNDS } from '../common/constants';
import { ErrorManager } from 'src/Config/error.manager';
import { MentorService } from 'src/mentor/mentor.service';
import { AlumnService } from 'src/alunm/alunm.service';
import { send } from 'src/Config/nodeMailer';
import { verify_ages } from 'src/functions/general';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly mentorService: MentorService,
    private readonly alumnService: AlumnService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async studentRegister(
    {
      password,
      email,
      firstName,
      lastName,
      role,
      phone,
      categories,
    }: RegisterDto,
    file?: Express.Multer.File,
  ) {
    try {
      const verifyUser = await this.userService.findByEmailExistent(email);
      if (verifyUser)
        throw new BadRequestException(`This Email is already registered`);

      const encriptedPass = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await this.userService.createUser({
        firstName,
        lastName,
        phone,
        email,
        role,
        password: encriptedPass,
      });

      const alumno = await this.alumnService.create(
        {
          user: newUser,
          categoriesId: categories,
        },
        file,
      );
      await send(email);
      return {
        // user: newUser,
        alumno,
      };
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }

  async login(user: LoginDto) {
    try {
      const verifyUser = await this.userService.findByEmailExistent(user.email);
      if (!verifyUser)
        throw new UnauthorizedException(`Wrong document or password`);
      const isMatch = await bcrypt.compare(user.password, verifyUser.password);

      if (!isMatch) throw new UnauthorizedException(`Wrong email or password`);

      const token = await this.jwtService.signAsync(
        { userId: verifyUser.id, role: verifyUser.role },
        {
          secret: JWT_SECRET,
          expiresIn: '1d',
        },
      );
      return {
        token: token,
        userId: verifyUser.id,
        role: verifyUser.role,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async mentorRegister(
    {
      password,
      firstName,
      lastName,
      email,
      phone,
      role,
      mentorDescription,
      categories,
      price,
      aboutMe,
      birthDate,
      speciality,
      mentor_availability,
    }: RegisterDto,
    file: Express.Multer.File,
  ) {
    try {
      const encriptedPass = await bcrypt.hash(password, SALT_ROUNDS);
      if (!birthDate) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'enter date of birth',
        };
      }
      const verify = verify_ages(birthDate);
      if (!verify) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'You cannot register as a mentor because you are a minor',
        };
      }
      if (categories.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'enter the categories',
        };
      }

      if (mentor_availability.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'enter the availability',
        };
      }
      const newUser = await this.userService.createMentor({
        firstName,
        lastName,
        phone,
        email,
        role,
        password: encriptedPass,
      });
      const create_object_mentor = {
        mentorDescription,
        price,
        aboutMe,
        birthdate: birthDate,
        Categories: categories,
        idSpeciality: speciality,
        userId: newUser['id'],
        mentor_availability,
      };

      const mentor = await this.mentorService.post_create_mentor(
        create_object_mentor,
        file,
      );
      await send(email);
      return {
        // user: newUser,
        mentor,
      };
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }
  async find_User(id: string) {
    const seachUser = await this.userRepository.findOne({
      where: { id },
    });
    return seachUser;
  }
}
