import { uploadCloudinary } from 'src/Config/upload';
import { updateCategories } from 'src/mentor/class/Categories/updateCategories.dto';
import { Category } from 'src/mentor/models/categories.entity';
import { DeepPartial } from 'typeorm';

export const create_object_category_update = async (
  categories: updateCategories,
  file: Express.Multer.File,
) => {
  const object_categories = {};
  if (file) {
    const uploadImage = await uploadCloudinary(file);
    object_categories['image'] = uploadImage['url'];
  }

  if (categories.name) {
    object_categories['name'] = categories.name;
  }
  if (categories.name) {
    object_categories['name'] = categories.name;
  }

  const category: DeepPartial<Category> = object_categories;
  return category;
};
