import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // 기본값이 username이므로 email로 변경해줌
  }

  // 이게 도대체 어느 지점에서 실행되는 거람.. ???
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return null; // null이면 401 에러 발생
    }
    return user; // null이 아니면 user 정보 반환
  }
}
