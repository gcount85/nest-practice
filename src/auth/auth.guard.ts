import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// 가드는 CanActivate 인터페이스 구현한 것이다.
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  // CanActivate 인터페이스의 메서드를 구현한다.
  // true는 인증 성공, false는 인증 실패를 의미한다. false시 403 response.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // 컨텍스트에서 리퀘스트 정보를 가져옴

    // 쿠키가 존재하면 인증 처리
    if (request.cookies['login']) {
      return true;
    }

    // 쿠키는 없지만 email과 password 정보가 있는 경우
    if (!(request.body.email && request.body.password)) {
      return false;
    }

    // validateUser를 통해 등록된 유저인지 확인
    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    // 유저가 없으면 fasle
    if (!user) {
      return false;
    }

    // 유저가 존재하면 user 정보를 request에 추가하여 true 반환
    request.user = user;
    return true;
  }
}

@Injectable()
// AuthGuard 상속 & 로컬 스트래티지 이용
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean; // 로컬 스트래티지 실행. 내부적으로 LocalStrategy의 validate 메소드가 호출
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); // 세션 저장
    return result;
  }
}

@Injectable()
// 로그인 후 인증이 되었는지 확인할 때 사용
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated(); // 세션에서 정보를 읽어옴
  }
}

@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean; // 카카오 스트래티지 실행. 내부적으로 KakaoOauthStrategy의 validate 메소드가 호출
    const request = context.switchToHttp().getRequest();
    // await super.logIn(request); // 세션 저장
    return result;
  }
}
