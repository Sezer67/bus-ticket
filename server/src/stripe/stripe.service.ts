import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.entity';
import Stripe from 'stripe';
import { TicketPayDto } from './dto/stripe.ticket-buy.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private bearerToken: string = "Bearer ";
  constructor(
    private readonly configService: ConfigService,
  ) {
    this.bearerToken += configService.get<string>('stripeApiKey');
    this.stripe = new Stripe("sk_test_51N6fwyK1ItlLPFTCo1aIhozigkmgTvm9EPjz1PpOq8RScI60piGUGHgsUyAs5xrIvxjLgJRmTOBmilTEwijFvB6J00UiW5c6Jm", {
      apiVersion: '2022-11-15',
    });
  }

  async createPayment(user: User, dto: TicketPayDto): Promise<any> {
    try {
      const intent = await this.stripe.paymentIntents.create({
        amount: dto.price * 100,
        currency: 'try',
        payment_method_types: ['card'],
        metadata: {
          fullName: user.fullName,
          userID: user.id,
          email: user.mail
        }
      });

      return {
        clientSecret: intent.client_secret
      };
    } catch (error) {
        throw error;
    }
  }
}
