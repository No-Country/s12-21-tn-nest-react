import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const paypal = require('@paypal/checkout-server-sdk');
import { CreatePaypalOrderDto } from './dto/create-paypal.dto';
import { Paypal } from './entities/paypal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavePaypalOrderDto } from './dto/save-paypal.dto';
import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';

const host = process.env.HOST;
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET,
);
environment.baseUrl = process.env.PAYPAL_API_URL;
const client = new paypal.core.PayPalHttpClient(environment);

@Injectable()
export class PaypalService {
  constructor(
    @InjectRepository(Paypal) private paypalRepository: Repository<Paypal>,
    @InjectRepository(AlumnHireMentor)
    private mentorshipRepository: Repository<AlumnHireMentor>,
  ) {}
  async createOrder(createPaypalOrderDto: CreatePaypalOrderDto) {
    try {
      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: createPaypalOrderDto.reference_id,
            amount: {
              currency_code: createPaypalOrderDto.currency_code,
              value: createPaypalOrderDto.value,
            },
          },
        ],
        application_context: {
          brand_name: createPaypalOrderDto.brand_name,
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${host}?plattform=paypal`,
          cancel_url: `${host}?plattform=paypal`,
        },
      });

      const response = await client.execute(request);
      const newOrder = {
        paypal_id: response.result.id,
        status: response.result.status,
        mentorship: createPaypalOrderDto.reference_id,
        url: response.result.links[1].href,
      };
      await this.createOrUpdateOrder(newOrder);
      return {
        id: response.result.id,
        url: response.result.links[1].href,
      };
    } catch (error) {
      this.paypalErrorHandler(error, createPaypalOrderDto.reference_id);
    }
  }

  findAll() {
    throw new HttpException(
      `#You can only generate an order and save a new payment`,
      HttpStatus.FORBIDDEN,
    );
  }

  async captureOrder(token: string) {
    try {
      const request = new paypal.orders.OrdersCaptureRequest(token);
      request.requestBody({});
      const response = await client.execute(request);
      const newOrder = {
        paypal_id: response.result.id,
        status: response.result.status,
        mentorship: response.result.purchase_units[0].reference_id,
        url: null,
      };
      await this.createOrUpdateOrder(newOrder);
      return {
        status: response.result.status,
        mentorship: response.result.purchase_units[0].reference_id,
      };
    } catch (error) {
      this.paypalErrorHandler(error, token);
    }
  }

  async getOrderStatus(token: string) {
    try {
      const request = new paypal.orders.OrdersGetRequest(token);
      const response = await client.execute(request);
      const url = response.result.links[1]?.href || null;

      const newOrder = {
        paypal_id: response.result.id,
        status: response.result.status,
        mentorship: response.result.purchase_units[0].reference_id,
        url,
      };
      await this.createOrUpdateOrder(newOrder);

      return {
        status: response.result.status,
        mentorship: response.result.purchase_units[0].reference_id,
      };
    } catch (error) {
      this.paypalErrorHandler(error, token);
    }
  }

  private async createOrUpdateOrder(order: SavePaypalOrderDto) {
    try {
      const existingOrder = await this.paypalRepository.findOne({
        where: {
          paypal_id: order.paypal_id,
        },
      });
      if (existingOrder) {
        this.paypalRepository.merge(existingOrder, order);
        return this.paypalRepository.save(existingOrder);
      } else {
        const newOrder = this.paypalRepository.create({
          ...order,
        });
        const savedOrder = await this.paypalRepository.insert(newOrder);

        const mentorship = await this.mentorshipRepository.findOne({
          where: { id: order.mentorship },
        });
        if (mentorship) {
          mentorship.paypal_payment = savedOrder.identifiers[0].id;
          await await this.mentorshipRepository.save(mentorship);
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Can't save or update order`,
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(error.message),
        },
      );
    }
  }

  update(id: number) {
    throw new HttpException(
      `#${id}: You can't update any payment`,
      HttpStatus.FORBIDDEN,
    );
  }

  remove(id: number) {
    throw new HttpException(
      `#${id}: You can't delete any payment`,
      HttpStatus.FORBIDDEN,
    );
  }

  private paypalErrorHandler(error: Error | any, token: string) {
    console.log(error.message);
    const message =
      JSON.parse(error._originalError.text).details[0].description ||
      `Can't proccess ${token} order. For more details, see server console log`;
    throw new HttpException(
      message,
      error.statusCode || HttpStatus.BAD_REQUEST,
      {
        cause: new Error(error.message),
      },
    );
  }
}
