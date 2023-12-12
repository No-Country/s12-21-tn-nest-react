import { Injectable } from '@nestjs/common';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Mpago } from './entities/mpago.entity';
import { Repository } from 'typeorm';

const host = process.env.HOST;
const accessToken = process.env.MP_ACCESS_TOKEN;
const success = `${host}/api/mpago/success`;
const failure = `${host}/api/mpago/failure`;
const pending = `${host}/api/mpago/pending`;

@Injectable()
export class MpagoService {
  constructor(
    @InjectRepository(Mpago)
    private mpagoRepository: Repository<Mpago>,
  ) {}
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
          external_reference: 'idididididid', //alumn_hire_mentor id
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
      //test data reemplazar por saveOrUpdate func
      const newOrder = {
        mpago_preference_id: checkoutData.id,
        status: 'never',
        status_detail: 'never',
        mentorship: '5e2f12cc-989e-11ee-98ba-fcaa14c77543',
        url: checkoutData.init_point,
      };
      const newOrderToStore = this.mpagoRepository.create({
        ...newOrder,
      });
      await this.mpagoRepository.insert(newOrderToStore);
      //console.log(checkoutData);

      return { id: checkoutData.id, init_point: checkoutData.init_point };
    } catch (error) {
      console.log({ message: error });
    }
  }

  async success(id: string) {
    const client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 5000 },
    });
    const payment = new Payment(client);

    const data = await payment.get({
      id,
    });
    console.log(data);
    return { data };
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
