import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStripeIntentDto } from './dto/create-stripe-intent.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';

const stripeApiKey = process.env.STRIPE_SECRET_KEY;
//const stripeCliKey = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(stripeApiKey, {
  apiVersion: '2023-10-16',
});

const successUrl = process.env.STRIPE_SUCCESS_URL;
const cancelUrl = process.env.STRIPE_CANCEL_URL;

@Injectable()
export class StripeService {
  async createPaymentIntent(
    createStripeIntentDto: CreateStripeIntentDto,
  ): Promise<any> {
    const convertAmount = createStripeIntentDto.amount * 100;
    try {
      /*
        database ops
      */
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            quantity: 1,
            price_data: {
              product_data: {
                name: createStripeIntentDto.brand_name,
              },
              currency: createStripeIntentDto.currency_code,
              unit_amount: convertAmount,
            },
          },
        ],
        mode: 'payment',
        success_url: `${successUrl}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${cancelUrl}/cancel`,
        payment_intent_data: {
          metadata: {
            mentorship: createStripeIntentDto.reference_id,
            //pupil: createStripeIntentDto.pupil_id,
          },
        },
      });
      return session.url;
    } catch (error) {
      throw error;
    }
  }

  async successPayment(session_id: any): Promise<any> {
    const billing_detail = await stripe.checkout.sessions.listLineItems(
      session_id,
      { limit: 5 },
    );
    const session = await stripe.checkout.sessions.retrieve(session_id);
    /**Database ops */
    console.log(session);
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
