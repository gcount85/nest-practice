import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // TypeOrmModule과 User 엔티티 등록
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // user 모듈이 아닌 auth 모듈에서 사용 가능하도록 export
})
export class UserModule {}
