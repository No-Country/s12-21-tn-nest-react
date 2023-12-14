import { Injectable } from '@nestjs/common';
import { AlunmCreateRequestDto } from './dtos/alunmCreateRequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumn } from './models/alumn.entity';
import { Repository } from 'typeorm';
import { uploadCloudinary } from 'src/Config/upload';
import { AlumnHireMentor } from './models/alumnHireMentor.entity';
import { Category } from 'src/mentor/models/categories.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { AlunmUpdateRequestDto } from './dtos/alumnUpdate.dto';
import { User } from 'src/auth/user/entities/user.entity';

@Injectable()
export class AlumnService {
  constructor(
    @InjectRepository(Alumn) private alumnRepository: Repository<Alumn>,
    @InjectRepository(Mentor) private mentorRepsitory: Repository<Mentor>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(AlumnHireMentor)
    private alumnHireMentorRepository: Repository<AlumnHireMentor>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(request: AlunmCreateRequestDto, file: Express.Multer.File) {
    try {
      let categories: Category[] = [];

      if (request.categoriesId)
        categories = await this.categoryRepository.findByIds(
          request.categoriesId,
        );

      if (!file) {
        const alumn = this.alumnRepository.create({
          ...request,
          categories,
        });
        //add categorie
        return await this.alumnRepository.save(alumn);
      }

      const fileUploaded = await uploadCloudinary(file);
      const profileImg = (fileUploaded as { url: string }).url;
      const alumn = this.alumnRepository.create({
        ...request,
        profileImg,
        categories,
      });
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
      return await this.alumnRepository.findOne({
        where: { id },
        relations: [
          'categories',
          'AlumnHireMentors',
          'AlumnHireMentors.categoryjoin',
          'AlumnHireMentors.mentorJoin',
          'AlumnHireMentors.mentorJoin.categories',
        ],
      });
    } catch (error) {
      throw 'Error finding alumn';
    }
  }

  async remove(id: string) {
    try {
      const alumn = await this.alumnRepository.findOne({ where: { id } });
      this.alumnRepository.softDelete(alumn.id);
    } catch (error) {
      throw 'Error deleting alumn';
    }
  }

  async restore(id: string) {
    try {
      const find = await this.alumnRepository.findOne({
        withDeleted: true,
        where: { id },
      });
      this.alumnRepository.restore(find.id);
    } catch (error) {
      throw 'Error restoring alumn';
    }
  }

  async update(
    request: AlunmUpdateRequestDto,
    file: Express.Multer.File,
    id: string,
  ) {
    try {
      const alumn = await this.alumnRepository.findOne({
        where: { id },
        relations: ['categories', 'user'],
      });
      if (!alumn) throw 'Alumn not found';

      const { categoriesId, ...rest } = request;
      const categories = await this.categoryRepository.findByIds(categoriesId);

      const user = await this.userRepository.findOne({
        where: { id: alumn.user.id },
      });

      alumn.categories = categories;
      user.email = rest.email;
      user.firstName = rest.firstName;
      user.lastName = rest.lastName;
      user.phone = rest.phone;
      alumn.user = user;

      this.userRepository.save(user);
      if (!file) {
        return await this.alumnRepository.save(alumn);
      }

      const fileUploaded = await uploadCloudinary(file);
      const profileImg = (fileUploaded as { url: string }).url;
      alumn.profileImg = profileImg;

      const updated = await this.alumnRepository.save(alumn);
      return updated 
    } catch (error) {
      console.log(error);
      throw 'Error updating alumn';
    }
  }

  async hireMentor(idA: string, idM: string, idC: string) {
    try {
      const { alumn, mentor, category } = await this.prepareAlumnHireMentor(
        idA,
        idM,
        idC,
      );
      return await this.saveMentorHire(alumn, mentor, category);
    } catch (error) {
      throw new Error('Error hiring mentor');
    }
  }

  private async prepareAlumnHireMentor(idA, idM, idC) {
    try {
      const alumn = await this.alumnRepository.findOne({ where: { id: idA } });
      if (!alumn) throw new Error('Alumn not found');

      const mentor = await this.mentorRepsitory.findOne({
        where: { id: idM },
        relations: ['categories'],
      });
      if (!mentor) throw new Error('Mentor not found');
      const category = mentor.categories.find((c) => c.id === idC);
      if (!category) throw new Error('Mentor does not have this category');

      return { alumn, mentor, category };
    } catch (error) {
      throw new Error('Error preparing alumn hire mentor');
    }
  }

  private async saveMentorHire(alumn, mentor, category) {
    try {
      const alumnHireMentor = this.alumnHireMentorRepository.create({
        alumnJoin: alumn,
        mentorJoin: mentor,
        categoryjoin: category,
        date: new Date(),
      });

      return await this.alumnHireMentorRepository.save(alumnHireMentor);
    } catch (error) {
      throw new Error('Error saving mentor hire');
    }
  }

  async finishMentory(id: string) {
    const find = await this.alumnHireMentorRepository.findOne({
      where: { id },
    });
    if (!find) throw 'Hire not found';

    try {
      find.finished = true;
      return await this.alumnHireMentorRepository.save(find);
    } catch (error) {
      throw 'Error finishing mentor hire';
    }
  }

  async calificateMentor(id: string, calification: number) {
    const find = await this.alumnHireMentorRepository.findOne({
      where: { id },
    });
    if (!find || !find.finished)
      throw new Error('Hire not found or Mentory not finished');
    try {
      find.calification = calification;
      return await this.alumnHireMentorRepository.save(find);
    } catch (error) {
      throw new Error('Error calificating mentor hire');
    }
  }
}
