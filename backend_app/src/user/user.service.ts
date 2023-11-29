import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './models/rol.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './class/createUser.dto';
import { User } from './models/user.entity';
import { create_object_user } from 'src/functions/DeepPartial';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create_rol_user() {
    let bandera = false;
    try {
      const rol_list = ['mentor', 'alumno', 'admin'];
      for (let i = 0; i < rol_list.length; i++) {
        const findrol = await this.rolRepository.findOne({
          where: { name: rol_list[i] },
        });

        if (!findrol) {
          const data = this.rolRepository.create({
            name: rol_list[i].toLowerCase(),
          });
          await this.rolRepository.save(data);
          bandera = true;
        }
      }
      return bandera;
    } catch (error) {
      console.log(error);
    }
  }

  async filter_rol_user() {
    try {
      return await this.rolRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async post_create_user(post: CreateUser) {
    const searchUser = await this.userRepository.findOne({
      where: { correo: post.correo },
    });

    if (searchUser) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'correo already exists',
      };
    }
    const create_object = await create_object_user(post);
    const userCreated = this.userRepository.create(create_object);
    this.userRepository.save(userCreated);

    return {
      status: HttpStatus.CREATED,
      message: 'account created successfully',
    };
  }
}
