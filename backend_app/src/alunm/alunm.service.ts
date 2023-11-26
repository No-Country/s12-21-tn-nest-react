import { Injectable } from '@nestjs/common';
import { AlunmCreateRequestDto } from './dtos/alunmCreateRequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumn } from './models/alumn.entity';
import { Repository } from 'typeorm';
import { uploadCloudinary } from 'src/Config/upload';
import { AlumnHireMentor } from './models/alumnHireMentor.entity';

@Injectable()
export class AlunmService {
  constructor(
    @InjectRepository(Alumn) private alumnRepository: Repository<Alumn>,
    @InjectRepository(AlumnHireMentor)
    private alumnHireMentorRepository: Repository<AlumnHireMentor>,
  ) {}

  async create(request: AlunmCreateRequestDto, file: Express.Multer.File) {
    try {
      const fileUploaded = file ? await uploadCloudinary(file) : { url: null };
      const profileImg = (fileUploaded as { url: string }).url;
      const alumn = this.alumnRepository.create({ ...request, profileImg });

      return await this.alumnRepository.save(alumn);
    } catch (error) {
      throw 'Error creating alumn';
    }
  }

  async findAll() {
    try {
      return await this.alumnRepository.find();
    } catch (error) {
      throw 'Error finding alumns';
    }
  }

  async findByMentor(id: string) {
    try {
      return await this.alumnHireMentorRepository.find({
        relations: ['alumnJoin'],
        where: { mentorJoin: { id } },
      });
    } catch (error) {
      throw 'Error finding alumns';
    }
  }

  async findOne(id: string) {
    try {
      return await this.alumnRepository.findOne({ where: { id } });
    } catch (error) {
      throw 'Error finding alumn';
    }
  }

  async remove(id: string) {
    try {
      this.alumnRepository.softDelete(id);
    } catch (error) {
      throw 'Error deleting alumn';
    }
  }

  async update(
    request: AlunmCreateRequestDto,
    file: Express.Multer.File,
    id: string,
  ) {
    try {
      const find = await this.alumnRepository.findOne({ where: { id } });
      if (!find) throw 'Alumn not found';

      if (!file) {
        const alumn = this.alumnRepository.create({ ...request });
        return await this.alumnRepository.update(id, alumn);
      }

      const fileUploaded = await uploadCloudinary(file);
      const profileImg = (fileUploaded as { url: string }).url;
      const alumn = this.alumnRepository.create({ ...request, profileImg });
      return await this.alumnRepository.update(id, alumn);
    } catch (error) {
      throw 'Error updating alumn';
    }
  }
}
