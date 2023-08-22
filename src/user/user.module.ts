import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // TypeOrmModule과 User 엔티티 등록
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // UserService 모듈을 export하여 AuthModule에서 사용하도록 한다.
})
export class UserModule {}
