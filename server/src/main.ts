import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: configService.get('CORS_ORIGIN'),
  });
  await app.listen(configService.get('PORT'));
}
bootstrap();
