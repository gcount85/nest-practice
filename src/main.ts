import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // main.ts에서 환경변수 사용하는 법
  await app.listen(3000, () => {
    console.log(
      `자 이제 시작이야 nest~ listening on ${configService.get('SERVICE_URL')}`,
    );
  });
}
bootstrap();
