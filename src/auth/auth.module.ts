import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule], // UserService가 아닌 UserModule 자체를 임포트
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
