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
      const existingUser = await this.prisma.user.findUnique({
        where: { id: createStripeIntentDto.reference_id },
      });
      if (!existingUser){
        throw new ConflictException('User ID no found');
      }
      console.log('estoy aqui')
      if(isMongoId(createStripeIntentDto.initiativeId)){
        const existingInitiative = await this.prisma.initiative.findUnique({
          where: {id: createStripeIntentDto.initiativeId}
        })
        if (!existingInitiative){
          throw new ConflictException('Initiative ID no found');
        }
      }else if (createStripeIntentDto.initiativeId != 'globalDonation'){
        throw new ConflictException('Initiative ID invalid');
      }
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
        success_url: `${successUrl}/success`,
        cancel_url: `${cancelUrl}/cancel`,
        payment_intent_data: {
          metadata: {
            userId: createStripeIntentDto.reference_id,
            //initiativeId: createStripeIntentDto.initiativeId,
          },
        },
      });
      console.log(session);
      return session.url;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
