import { Injectable } from '@nestjs/common';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const host = process.env.HOST;
const accessToken = process.env.MP_ACCESS_TOKEN;
const success = `${host}/api/mpago/success`;
const failure = `${host}/api/mpago/failure`;
const pending = `${host}/api/mpago/pending`;

@Injectable()
export class MpagoService {
  async create(createMpagoDto: CreateMpagoDto) {
    try {
      const client = new MercadoPagoConfig({
        accessToken,
        options: { timeout: 5000 },
      });

      const preference = new Preference(client);
      //utilizar dto para completar las preferencias
      const checkoutData = await preference.create({
        body: {
          auto_return: 'all',
          back_urls: { success, failure, pending },
          marketplace: 'MentorSphere',
          payer: {
            email: 'nn@mail.com',
            identification: { type: 'dni', number: '12345678' },
          },
          items: [
            {
              id: 'wKVNqjnvLNBbm7S93VCBWo',
              title: 'Mentorship of user x...',
              quantity: 1,
              unit_price: 589,
            },
          ],
        },
      });
      //persistir order en la base de datos
      return { id: checkoutData.id, init_point: checkoutData.init_point };
    } catch (error) {
      console.log({ message: error });
    }
  }

  success(id: string) {
    //request a mpago de la order y su status
    //update de order en database
    //return true or paid
    return id;
  }

  findOne(id: number) {
    return `This action returns a #${id} mpago`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateMpagoDto: UpdateMpagoDto) {
    return `This action updates a #${id} mpago`;
  }

  remove(id: number) {
    return `This action removes a #${id} mpago`;
  }
}
