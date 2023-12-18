import { uploadCloudinary } from 'src/Config/upload';
import { updateCategories } from 'src/mentor/class/Categories/updateCategories.dto';
import { createMentor } from 'src/mentor/class/Mentor/createMentor.dto';
import { updateMentor } from 'src/mentor/class/Mentor/updateMentor.dto';
import { Category } from 'src/mentor/models/categories.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { createQuotes } from 'src/quotes/class/quotes.dto';
import { DeepPartial } from 'typeorm';
import { Alumn } from '../alunm/models/alumn.entity';
import { Quotes } from 'src/quotes/models/quotes.entity';

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
  const category: DeepPartial<Category> = object_categories;
  return category;
};

export const create_object_mentor = async (post: createMentor) => {
  const mentor: DeepPartial<Mentor> = {
    birthdate: post['birthdate'],
    price: post['price'],
    mentorDescription: post['mentorDescription'],
    aboutMe: post['aboutMe'],
    speciality: { id: post['idSpeciality'] },
    userId: { id: post['userId'] },
  };
  return mentor;
};

export const create_object_quotes = async (post: createQuotes) => {
  const quote: DeepPartial<Quotes> = {
    mentor: { id: post.mentorId },
    alumn: { id: post.alumnId },
    appointmentDate: post['appointmentDate'],
    state: post['state'],
  };
  return quote;
};

export const update_object_mentor = async (
  put: updateMentor,
  file: Express.Multer.File,
) => {
  const object_update = {};
  let uploadImage: any;
  if (file) {
    uploadImage = await uploadCloudinary(file);
    object_update['image'] = uploadImage['url'];
  }
  for (const key in put) {
    if (put[key] !== undefined) {
      if (key === 'speciality') {
        object_update[key] = { id: put[key] };
      } else {
        if (
          key !== 'categories' &&
          key != 'firstName' &&
          key !== 'lastName' &&
          key !== 'phone' &&
          key !== 'birthday' &&
          key !== 'password' &&
          key !== 'mentor_availability'
        ) {
          object_update[key] = put[key];
        }
      }
    }
  }
  const mentor: DeepPartial<Mentor> = object_update;
  return mentor;
};
