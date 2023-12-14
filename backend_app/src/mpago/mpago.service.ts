import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Mpago } from './entities/mpago.entity';
import { Repository } from 'typeorm';
import { SaveMpagoDto } from './dto/save-mpago.dto';
import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';

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
    @InjectRepository(AlumnHireMentor)
    private mentorshipRepository: Repository<AlumnHireMentor>,
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
          external_reference: createMpagoDto.external_reference, //alumn_hire_mentor id
          payer: {
            email: createMpagoDto.email,
            identification: { type: 'dni', number: '12345678' },
          },
          items: [
            {
              id: 'wKVNqjnvLNBbm7S93VCBWo',
              title: createMpagoDto.brand_name,
              quantity: 1,
              unit_price: Number(createMpagoDto.value),
            },
          ],
        },
      });

      const newOrder = {
        mpago_preference_id: checkoutData.id,
        status: 'never',
        status_detail: 'never',
        mentorship: checkoutData.external_reference,
        url: checkoutData.init_point,
      };
      await this.createOrUpdateOrder(newOrder);

      return { id: checkoutData.id, url: checkoutData.init_point };
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

  private async createOrUpdateOrder(order: SaveMpagoDto) {
    try {
      const existingOrder = await this.mpagoRepository.findOne({
        where: {
          mpago_preference_id: order.mpago_preference_id,
        },
      });
      if (existingOrder) {
        this.mpagoRepository.merge(existingOrder, order);
        return this.mpagoRepository.save(existingOrder);
      } else {
        const newOrder = this.mpagoRepository.create({
          ...order,
        });
        const savedOrder = await this.mpagoRepository.insert(newOrder);

        const mentorship = await this.mentorshipRepository.findOne({
          where: { id: order.mentorship },
        });
        if (mentorship) {
          mentorship.mpago_payment = savedOrder.identifiers[0].id;
          await this.mentorshipRepository.save(mentorship);
        }
      }
    } catch (error) {
      throw new HttpException(
        `Can't save or update order`,
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(error.message),
        },
      );
    }
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
