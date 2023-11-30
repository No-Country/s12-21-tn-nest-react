import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Mentor } from '../../mentor/models/mentor.entity';
import { ErrorManager } from 'src/Config/error.manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Mentor)
    private readonly mentorRepository: Repository<Mentor>,
  ) {}

  async findAll({ offset = 0, limit = 10 }: PaginationDto): Promise<User[]> {
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });

    if (users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async findByEmailExistent(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
        select: ['password', 'id', 'email'],
      });

      // if (user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }

  async createMentor(
    { email, password, role, firstName, lastName, phone }: CreateUserDto,
    // file?: Express.Multer.File,
  ) {
    try {
      const user = this.userRepository.create({
        email,
        password,
        role,
        firstName,
        lastName,
        phone,
      });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }

  async createStudent(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role,
      });

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });

      if (!user) {
        throw new NotFoundException(`User with Id ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.update({ id }, updateUserDto);
      if (!user) {
        throw new NotFoundException(`User with Id ${id} not found`);
      }

      return `User with Id ${id} was successfully updated`;
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.softDelete(id);

      return `User with Id ${id} was successfully deleted`;
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }
}
