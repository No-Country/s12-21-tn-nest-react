import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './models/categories.entity';
import { Repository } from 'typeorm';
import { createCategories } from './class/Categories/createCategories.dto';
import { uploadCloudinary } from 'src/Config/upload';
import { updateCategories } from './class/Categories/updateCategories.dto';
import { create_object_category_update } from 'src/functions/DeepPartial';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(Category) private categories: Repository<Category>,
  ) {}
  async get_categories_all() {
    try {
      return await this.categories.find();
    } catch (error) {
      console.log(error);
    }
  }

  async get_categories_name(name: string) {
    return this.categories.findOne({ where: { name } });
  }

  async get_categories_id(id: string) {
    return this.categories.findOne({ where: { id } });
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
      const categoriesCreate = this.categories.create(post);
      this.categories.save(categoriesCreate);
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
      const updateCategories = await this.categories.update(
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
}
