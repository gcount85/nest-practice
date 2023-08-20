import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) {}

  @Get()
  public getWeather(): string {
    // isGlobal 설정으로 weather.module.ts에 ConfigModule 설정 안 해도 무방
    const apiUrl = this.configService.get('WEATHER_API_URL');
    const apiKey = this.configService.get('WEATHER_API_KEY');
    return this.callWeatherApi(apiUrl, apiKey);
  }

  private callWeatherApi(apiUrl: string, apiKey: string) {
    console.log(apiKey, apiUrl);
    return '내일은 맑음';
  }
}
