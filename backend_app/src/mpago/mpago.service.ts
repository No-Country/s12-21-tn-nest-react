import { Injectable } from '@nestjs/common';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const host = process.env.HOST;
const accessToken = process.env.MP_ACCESS_TOKEN;
const publicKey = process.env.MP_PK;

@Injectable()
export class MpagoService {
  async create(createMpagoDto: CreateMpagoDto) {
    const success = `${host}/api/mpago/success`;
    const failure = `${host}/api/mpago/failure`;
    const pending = `${host}/api/mpago/pending`;

    try {
      console.log(accessToken);
      const client = new MercadoPagoConfig({
        accessToken,
        options: { timeout: 5000 },
      });

      const preference = new Preference(client);

      const checkoutData = await preference.create({
        body: {
          auto_return: 'all',
          back_urls: { success, failure, pending },
          marketplace: 'MentorSphere',
          payer: { email: 'nn@mail.com' },
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

      return { id: checkoutData.id, init_point: checkoutData.init_point };
    } catch (error) {
      console.log({ message: error });
    }
  }

  success(id: string) {
    return id;
  }

  findOne(id: number) {
    return `This action returns a #${id} mpago`;
  }

  update(id: number, updateMpagoDto: UpdateMpagoDto) {
    return `This action updates a #${id} mpago`;
  }

  remove(id: number) {
    return `This action removes a #${id} mpago`;
  }
}
