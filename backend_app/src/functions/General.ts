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
