import { Days } from 'src/quotes/models/days.entity';
import { Repository } from 'typeorm';

export const order_days = async (models: Repository<Days>) => {
  const result = await models
    .createQueryBuilder('days')
    .select(['days.id', 'days.name'])
    .orderBy({
      'CASE WHEN days.name = :lunes THEN 1 END': 'DESC',
      'CASE WHEN days.name = :martes THEN 2 END': 'DESC',
      'CASE WHEN days.name = :miercoles THEN 3 END': 'DESC',
      'CASE WHEN days.name = :jueves THEN 4 END': 'DESC',
      'CASE WHEN days.name = :viernes THEN 5 END': 'DESC',
      'CASE WHEN days.name = :sabados THEN 6 END': 'DESC',
      'CASE WHEN days.name = :domingos THEN 7 END': 'DESC',
      'CASE WHEN days.name NOT IN (:lunes, :martes, :miercoles, :jueves, :viernes, :sabados, :domingos) THEN 8 END':
        'ASC',
    })
    .setParameter('lunes', 'lunes')
    .setParameter('martes', 'martes')
    .setParameter('miercoles', 'miercoles')
    .setParameter('jueves', 'jueves')
    .setParameter('viernes', 'viernes')
    .setParameter('sabados', 'sabados')
    .setParameter('domingos', 'domingos')
    .getMany();
  return result;
};
