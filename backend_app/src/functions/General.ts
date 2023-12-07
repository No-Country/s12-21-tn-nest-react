export const verify_ages = (ages: Date) => {
  const dateBirthObj = new Date(ages);
  const currentDate = new Date();
  const difference = currentDate.getFullYear() - dateBirthObj.getFullYear();
  const result = difference > 18 ? true : false;
  return result;
};
