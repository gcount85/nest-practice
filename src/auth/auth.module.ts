import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { KakaoOauthStrategy } from './kakao-oauth.strategy';

@Module({
  // UserService를 사용하기 위해 UserModule 자체를 임포트한다.
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    // 명시적으로 LocalStrategy와 SessionSerializer를 주입하는 코드가 없지만, 등록해야 사용할 수 있음
    LocalStrategy,
    SessionSerializer,
    KakaoOauthStrategy,
  ],
})
export class AuthModule {}
