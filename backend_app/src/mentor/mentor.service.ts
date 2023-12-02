import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './models/categories.entity';
import { In, Repository } from 'typeorm';
import { createCategories } from './class/Categories/createCategories.dto';
import { uploadCloudinary } from 'src/Config/upload';
import { updateCategories } from './class/Categories/updateCategories.dto';
import {
  create_object_category_update,
  create_object_mentor,
  update_object_mentor,
} from 'src/functions/DeepPartial';
import { createMentor } from './class/Mentor/createMentor.dto';
import { verify_ages } from 'src/functions/general';
import { Mentor } from './models/mentor.entity';
import { Speciality } from './models/especializaciones';
import { updateMentor } from './class/Mentor/updateMentor.dto';
import * as bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../common/constants';
import { UserService } from 'src/auth/user/user.service';
@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Mentor) private mentorRepository: Repository<Mentor>,
    @InjectRepository(Speciality)
    private specialityRepository: Repository<Speciality>,
    private readonly userService: UserService,
  ) {}
  async get_categories_all() {
    try {
      return await this.categoriesRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async get_categories_name(name: string) {
    return this.categoriesRepository.findOne({ where: { name } });
  }

  async get_categories_id(id: string) {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async post_categories(post: createCategories, file: Express.Multer.File) {
    try {
      const categoryFound = await this.get_categories_name(post.name);
      if (categoryFound) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'the add category already exists',
        };
      }
      if (!file) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'enter the category image',
        };
      }
      const image = await uploadCloudinary(file);
      post.name = post.name.toLowerCase();
      post['image'] = image['url'];
      const categoriesCreate = this.categoriesRepository.create(post);
      this.categoriesRepository.save(categoriesCreate);
      return {
        status: HttpStatus.CREATED,
        message: 'user created successfully',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async update_categories(
    update: updateCategories,
    file: Express.Multer.File,
    id: string,
  ) {
    try {
      const object_categories = await create_object_category_update(
        update,
        file,
      );
      const updateCategories = await this.categoriesRepository.update(
        { id },
        object_categories,
      );
      if (updateCategories) {
        return {
          status: HttpStatus.ACCEPTED,
          message: 'categories updated successfully',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async post_create_mentor(post: createMentor, file: Express.Multer.File) {
    try {
      if (file) {
        const upload = await uploadCloudinary(file);
        post['image'] = upload['url'];
      }
      if (!post.birthdate) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'enter date of birth',
        };
      }
      const verify = verify_ages(post.birthdate);
      if (!verify) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'You cannot register as a mentor because you are a minor',
        };
      }
      const object_mentor = await create_object_mentor(post, file);
      if (post.Categories.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'enter the project categories',
        };
      }
      const categoriesSearch = await this.categoriesRepository.findByIds(
        post.Categories,
      );
      const mentor_add = this.mentorRepository.create(object_mentor);
      mentor_add.categories = categoriesSearch;
      await this.mentorRepository.save(mentor_add);
      return {
        status: HttpStatus.CREATED,
        message: 'mentor added successfully',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async filer_mentor(
    categoryName: string[],
    order?: 'asc' | 'desc' | 'ascAlf' | 'descAlf',
  ) {
    try {
      let mentors = await this.mentorRepository.find({
        relations: {
          categories: true,
          speciality: true,
          userId: true,
        },
      });

      if (categoryName && categoryName.length > 0) {
        mentors = mentors.filter((mentor) =>
          mentor.categories.some((c) => categoryName.includes(c.name)),
        );
      }

      switch (order) {
        case 'asc':
          return mentors.sort((a, b) => Number(a.price) - Number(b.price));
        case 'desc':
          return mentors.sort((a, b) => Number(b.price) - Number(a.price));
        case 'ascAlf':
          return mentors.sort((a, b) =>
            a.userId.firstName.localeCompare(b.userId.firstName),
          );
          console.log(mentors);
        case 'descAlf':
          return mentors.sort((a, b) =>
            b.userId.firstName.localeCompare(a.userId.firstName),
          );
        default:
          return mentors;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async filter_speciality() {
    try {
      return this.specialityRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async create_speciality() {
    try {
      let bandera = false;
      const specialit_list = [
        'Front-End',
        'Back-End',
        'DevOps',
        'FullStack',
        'Mobile',
        'AI and DataScientist',
        'Blockchain',
        'QA',
        'Cybersecurity',
        'UX/UI designe',
        'Game Developer',
        'Software Architect',
        'Project Manager',
        'Technical Writing',
        'Other',
      ];
      for (let i = 0; i < specialit_list.length; i++) {
        const findSpeciality = await this.specialityRepository.findOne({
          where: { name: specialit_list[i] },
        });
        if (!findSpeciality) {
          const data = this.specialityRepository.create({
            name: specialit_list[i],
          });
          this.specialityRepository.save(data);
          bandera = true;
        }
      }
      return bandera;
    } catch (error) {
      console.log(error);
    }
  }

  async mentor_find(id: string) {
    return await this.mentorRepository.findOne({
      where: { id: id },
      relations: {
        categories: true,
        speciality: true,
        userId: true,
      },
    });
  }

  async delete_mentor_categories(id: string, idCategories: string) {
    try {
      if (id) {
        const mentorSearch = await this.mentor_find(id);
        const data = mentorSearch.categories.filter(
          (c) => c.id !== idCategories,
        );
        mentorSearch.categories = data;
        this.mentorRepository.save(mentorSearch);
        return {
          status: HttpStatus.ACCEPTED,
          message: 'categories delete successfully',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'id not found',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update_mentor_categories(
    id: string,
    updateProfile: updateMentor,
    file: Express.Multer.File,
  ) {
    if (!id) {
      return {
        status: HttpStatus.NOT_FOUND,
        mesage: 'id not found',
      };
    }

    const object_update_mentor = await update_object_mentor(
      updateProfile,
      file,
    );

    const update = await this.mentorRepository.update(
      { id },
      object_update_mentor,
    );

    if (update.affected === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'id not found',
      };
    }

    const searchMentor = await this.mentorRepository.findOne({
      where: { id },
      relations: {
        categories: true,
        speciality: true,
        userId: true,
      },
    });
    const object_user_actualiazar = {};
    if (updateProfile.firstName) {
      object_user_actualiazar['firstName'] = updateProfile.firstName;
    }

    if (updateProfile.lastName) {
      object_user_actualiazar['lastName'] = updateProfile.lastName;
    }

    if (updateProfile.password) {
      object_user_actualiazar['password'] = await bcrypt.hash(
        updateProfile.password,
        SALT_ROUNDS,
      );
    }
    if (updateProfile.phone) {
      object_user_actualiazar['phone'] = updateProfile.phone;
    }

    if (updateProfile.lastName) {
      object_user_actualiazar['lastName'] = updateProfile.lastName;
    }

    if (Object.keys(object_user_actualiazar).length > 0) {
      await this.userService.update(
        searchMentor.userId.id,
        object_user_actualiazar,
      );
    }

    if (updateProfile.categories.length > 0) {
      const categoriesSearch = await this.categoriesRepository.find({
        where: { id: In(updateProfile.categories) },
      });
      let newCategoriesToadd: Array<any>;
      if (categoriesSearch.length > 0) {
        newCategoriesToadd = categoriesSearch.filter(
          (categorySearch) =>
            !searchMentor.categories.some(
              (existingCategory) => existingCategory.id === categorySearch.id,
            ),
        );
      }
      if (newCategoriesToadd.length > 0) {
        searchMentor.categories.push(...newCategoriesToadd);
        this.mentorRepository.save(searchMentor);
      }
    }
    return {
      status: HttpStatus.ACCEPTED,
      message: 'profile has been updated',
    };
  }
  async desactive_profile(id: string) {
    const searchMentor = await this.mentorRepository.findOne({ where: { id } });
    if (searchMentor) {
      this.mentorRepository.save(searchMentor);
      return {
        status: HttpStatus.ACCEPTED,
        message: 'account has been desactivated',
      };
    } else {
      return {
        status: HttpStatus.ACCEPTED,
        message: 'the account is deactivated',
      };
    }
  }

  async active_profile(id: string) {
    const mentors = await this.mentorRepository.find({
      withDeleted: true,
      where: { id },
    });

    if (mentors.length && mentors[0].deletedAt !== null) {
      mentors[0].deletedAt = null;
      this.mentorRepository.save(mentors);
      return {
        status: HttpStatus.ACCEPTED,
        message: 'account has been activated',
      };
    } else {
      return {
        status: HttpStatus.ACCEPTED,
        message: 'the account is activated',
      };
    }
  }
}
