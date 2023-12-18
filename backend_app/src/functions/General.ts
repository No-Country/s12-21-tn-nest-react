import { Repository } from 'typeorm';

export const verify_ages = (ages: Date) => {
  const dateBirthObj = new Date(ages);
  const currentDate = new Date();
  const difference = currentDate.getFullYear() - dateBirthObj.getFullYear();
  const result = difference > 18 ? true : false;
  return result;
};

export const add_list_in_model = async (
  list: string[],
  model: Repository<any>,
) => {
  let bandera = false;
  for (let index = 0; index < list.length; index++) {
    const name = list[index];
    const SearchState = await model.findOne({
      where: { name },
    });
    if (!SearchState) {
      const data = model.create({ name });
      await model.save(data);
      bandera = true;
    }
  }
  return bandera;
};

export const add_in_list_element = async (
  array: Array<any>,
  model: Repository<any>,
  modelState: Repository<any>,
) => {
  const list: Array<any> = [];
  const state = await modelState.findOne({ where: { name: 'disponible' } });
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const availability = model.create(element);
    availability['state'] = state;
    await model.save(availability);
    list.push(availability);
  }
  return list;
};
