import { Injectable } from '@nestjs/common';
import {
  PayPalHttpClient,
  LiveEnvironment,
  SandboxEnvironment,
} from '@paypal/checkout-server-sdk';
const paypal = require('@paypal/checkout-server-sdk');
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { UpdatePaypalDto } from './dto/update-paypal.dto';

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET,
);
environment.baseUrl = process.env.PAYPAL_API_URL;
const client = new paypal.core.PayPalHttpClient(environment);

@Injectable()
export class PaypalService {
  private payPalClient: PayPalHttpClient;
  constructor() {}
  async create(createPaypalDto: CreatePaypalDto) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
          amount: {
            currency_code: 'USD',
            value: '20.00',
          },
        },
      ],
      application_context: {
        brand_name: 'MentorSphere Mentorship',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: 'http://localhost:8080/api/paypal/accepted',
        cancel_url: 'http://localhost:8080/api/paypal',
      },
    });

    const response = await client.execute(request);
    return response.result;
  }

  findAll() {
    return `This action returns all paypal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paypal`;
  }

  update(id: number, updatePaypalDto: UpdatePaypalDto) {
    return `This action updates a #${id} paypal`;
  }

  remove(id: number) {
    return `This action removes a #${id} paypal`;
  }
}
