import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorModule } from './mentor/mentor.module';
import { UserModule } from './auth/user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './auth/role/role.module';
import { AlunmModule } from './alunm/alunm.module';
import { PaypalModule } from './paypal/paypal.module';
<<<<<<< HEAD
import { ChatModule } from './chat/chat.module';
=======
import { StripeModule } from './stripe/stripe.module';
import { MpagoModule } from './mpago/mpago.module';
import { QuotesModule } from './quotes/quotes.module';
>>>>>>> 3c8660173668079dc51c981a984769868c4e387f

const featureModule = [
  MentorModule,
  AuthModule,
  RoleModule,
  AlunmModule,
<<<<<<< HEAD
  ChatModule
=======
  PaypalModule,
  StripeModule,
  MpagoModule,
  QuotesModule,
>>>>>>> 3c8660173668079dc51c981a984769868c4e387f
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
    ...featureModule,
    UserModule,
    PaypalModule,
  ],
  providers: [JwtService],
})
export class AppModule {}
