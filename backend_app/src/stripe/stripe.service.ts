import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateStripeIntentDto } from './dto/create-stripe-intent.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';
import { Stripe as StripeEntity } from './entities/stripe.entity';
import { StripeIntentSaveDto } from './dto/stripe-intent-save.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';

const stripeApiKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeApiKey, {
  apiVersion: '2023-10-16',
});

const host = process.env.HOST;

@Injectable()
export class StripeService {
  constructor(
    @InjectRepository(StripeEntity)
    private stripeRepository: Repository<StripeEntity>,
    @InjectRepository(AlumnHireMentor)
    private mentorshipRepository: Repository<AlumnHireMentor>,
  ) {}
  async createPaymentIntent(
    createStripeIntentDto: CreateStripeIntentDto,
  ): Promise<any> {
    const convertAmount = Number(createStripeIntentDto.amount) * 100;
    try {
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
        success_url: `${host}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${host}/api/stripe/cancel?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          mentorship: createStripeIntentDto.reference_id,
        },
        payment_intent_data: {
          metadata: {},
        },
      });
      return {
        id: session.id,
        url: session.url,
      };
    } catch (error) {
      console.log({ message: error });
      throw new HttpException(
        { message: error },
        error.statusCode || HttpStatus.BAD_REQUEST,
        {
          cause: new Error(error.message),
        },
      );
    }
  }

  async catchPayment(session_id: any): Promise<any> {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (!session) {
        throw new BadRequestException(
          'You must provide a valid Stripe session_id.',
        );
      }
      const newOrder: StripeIntentSaveDto = {
        stripe_session_id: session.id,
        mentorship: session.metadata.mentorship,
        payment_status: session.payment_status,
        status: session.status,
        url: session.url,
      };
      await this.createOrUpdateOrder(newOrder);
      return {
        status: session.payment_status,
        mentorship: session.metadata.mentorship,
      };
    } catch (error) {
      throw new HttpException(
        `Can't proccess ${session_id} payment.`,
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(error.message),
        },
      );
    }
  }

  private async createOrUpdateOrder(order: StripeIntentSaveDto) {
    try {
      const existingOrder = await this.stripeRepository.findOne({
        where: {
          stripe_session_id: order.stripe_session_id,
        },
      });
      if (existingOrder) {
        this.stripeRepository.merge(existingOrder, order);
        return this.stripeRepository.save(existingOrder);
      } else {
        const newOrder = this.stripeRepository.create({
          ...order,
        });
        const savedOrder = await this.stripeRepository.insert(newOrder);
        const mentorship = await this.mentorshipRepository.findOne({
          where: { id: order.mentorship },
        });
        if (mentorship) {
          mentorship.stripe_payment = savedOrder.identifiers[0].id;
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

  findAll() {
    throw new HttpException(
      `Only admins can perform this action`,
      HttpStatus.FORBIDDEN,
    );
  }

  async findOne(id: string) {
    return await this.stripeRepository.findOne({
      where: {
        stripe_session_id: id,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_id: number, _updateStripeDto: UpdateStripeDto) {
    throw new HttpException(
      `Only admins can perform this action`,
      HttpStatus.FORBIDDEN,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(_id: number) {
    throw new HttpException(
      `Only admins can perform this action`,
      HttpStatus.FORBIDDEN,
    );
  }
}
