import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController, BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema } from './blog.schema';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    // ConfigModule 설정. isGlobal, cache, envFilePath 옵션을 자주 사용.
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),
    // 몽고디비 연결 설정
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestjs', {
      lazyConnection: true,
    }),
    // 몽고디비 스키마 설정
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    WeatherModule,
  ],
  controllers: [AppController, BlogController],
  // 몽고 리포지토리 프로바이더 배열 추가
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
