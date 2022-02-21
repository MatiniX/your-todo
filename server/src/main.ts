import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { __prod__ } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  console.log(__prod__);

  app.enableCors({
    credentials: true,
    origin: false, //configService.get('CORS_ORIGIN'),
  });
  await app.listen(process.env.PORT || configService.get('PORT'));
}
bootstrap();
