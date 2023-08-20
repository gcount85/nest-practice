import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema } from './blog.schema';

@Module({
  imports: [
    // 몽고디비 연결 설정
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestjs', {
      lazyConnection: true,
    }),
    // 몽고디비 스키마 설정
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  // 몽고 리포지토리 프로바이더 배열 추가
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
