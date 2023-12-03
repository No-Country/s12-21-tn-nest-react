import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const paypal = require('@paypal/checkout-server-sdk');
import { CreatePaypalOrderDto } from './dto/create-paypal.dto';
import { Paypal } from './entities/paypal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  async create(createPaypalOrderDto: CreatePaypalOrderDto) {
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
        return_url: 'http://localhost:8080/api/paypal/accepted',
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

  async findOne(token: string) {
    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});
    const response = await client.execute(request);
    //console.log(`Response: ${JSON.stringify(response)}`);
    //console.log(`Capture: ${JSON.stringify(response.result)}`);
    //await this.paypalRepository.insert()
    return response.result;
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
