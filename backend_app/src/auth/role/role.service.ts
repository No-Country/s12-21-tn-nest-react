import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ErrorManager } from 'src/Config/error.manager';

@Injectable()
export class RoleService {

  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>){}
  
  async create(createRoleDto: CreateRoleDto) {

    try {
      const role = this.roleRepository.create(createRoleDto);
  
      return await this.roleRepository.save(role);
      
    } catch (error) {
      if (error) {
        throw new ErrorManager().errorHandler(error);
      }
    }
  }

  async findAll({offset=0 ,limit=10}: PaginationDto): Promise<Role[]> {
    try {
      
      return await this.roleRepository.find({
        take: limit,
        skip: offset
      });

    } catch (error) {
      if (error) {
          throw new ErrorManager().errorHandler(error);
        }
    }
  }
  
  async findOne(id: string): Promise<Role> {

    try {

      const role = await this.roleRepository.findOne({ where: {id}});
  
      if (!role) {
        throw new NotFoundException(`Role with Id ${id} not found`);
      }
  
      return role;
      
    } catch (error) {
      if (error) {
          throw new ErrorManager().errorHandler(error);
        }
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {

    try {
      
      const role = await this.roleRepository.update({ id }, updateRoleDto);
  
      if (!role) {
        throw new NotFoundException(`Role with Id ${id} not found`);
      }
  
      return `Role with Id ${id} was successfully updated`;

    } catch (error) {
      if (error) {
          throw new ErrorManager().errorHandler(error);
        }
    }
  }

  async remove(id: string) {
    
    try {
      
      const role = await this.roleRepository.findOne({ where: { id } });

      if (!role) throw new NotFoundException(`Role with Id '${id}' not found`);
 
      await this.roleRepository.softDelete(id);
  
      return `Role with Id '${id}' was successfully deleted`;

    } catch (error) {
      if (error) {
          throw new ErrorManager().errorHandler(error);
        }
    }
  }
}