import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule], // UserService를 사용하기 위해 UserModule 자체를 임포트한다.
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
