import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const paypal = require('@paypal/checkout-server-sdk');
import { CreatePaypalOrderDto } from './dto/create-paypal.dto';
import { Paypal } from './entities/paypal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavePaypalOrderDto } from './dto/save-paypal.dto';

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
  ) {}
  async createOrder(createPaypalOrderDto: CreatePaypalOrderDto) {
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
        return_url: `http://localhost:${process.env.PORT}/api/paypal/accepted`,
        cancel_url: createPaypalOrderDto.cancel_url,
      },
    });

    const response = await client.execute(request);
    return response.result;
  }

  findAll() {
    throw new HttpException(
      `#You can only generate an order and save a new payment`,
      HttpStatus.FORBIDDEN,
    );
  }

  async captureOrder(token: string) {
    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});
    const response = await client.execute(request);
    const newOrder = {
      paypal_id: response.result.id,
      status: response.result.status,
      mentorship: response.result.purchase_units[0].reference_id,
    };
    await this.saveOrder(newOrder);
    return response.result;
  }

  private async saveOrder(order: SavePaypalOrderDto) {
    const newOrder = this.paypalRepository.create({
      ...order,
    });
    await this.paypalRepository.insert(newOrder);
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
}
