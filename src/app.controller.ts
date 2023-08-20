import { Get, Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): object {
    return {
      // 환경 별 환경변수 출력
      message: this.configService.get('MESSAGE'), // `envFilePath` 지정으로 기존의 ".env" 파일은 인식 못 함
      serviceUrl: this.configService.get('SERVICE_URL'),
      logLevel: this.configService.get('logLevel'),
      apiVersion: this.configService.get('apiVersion'),
      dbInfo: this.configService.get('dbInfo'),
    };
  }
}
