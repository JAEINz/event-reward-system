import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import apiDocsBuilder from '../libs/shared/swagger/swagger-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('GATEWAY_PORT') || 3000;

  apiDocsBuilder(
    app,
    '[박재인] Event Reward System API Document',
    '이벤트 보상 시스템 API 문서입니다.',
  );

  await app.listen(port);
}
bootstrap();
