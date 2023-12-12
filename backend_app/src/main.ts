import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173', 'https://mentorsphere.vercel.app/'],
  };

  app.use(cors(corsOptions));
  const configservice = app.get<ConfigService>(ConfigService);
  const port = configservice.get('PORT');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('MentorHub API')
    .setDescription('This is an API for the MentorHub APP')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
}
bootstrap();
