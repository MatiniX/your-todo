import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { __prod__ } from './constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.set('trust proxy', 1);
  app.enableCors({
    credentials: true,
    origin: false, //configService.get('CORS_ORIGIN'),
  });
  await app.listen(process.env.PORT || configService.get('PORT'));
}
bootstrap();
