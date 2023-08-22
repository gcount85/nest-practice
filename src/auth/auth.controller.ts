import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // CreateUserDto를 사용하면 cross-validator가 자동으로 유효성 검증한다.
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  // 가드를 사용하지 않는 로그인
  @Post('login')
  async login(@Request() req, @Response() res) {
    // validateUser를 호출해 유저 정보 확인
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password, // 여기서 DB 보안화 안 필요한가?
    );

    // 유저 확인 되면 응답에 'login' 키에 유저 정보를 값으로 담은 쿠키를 반환
    res.cookie('login', JSON.stringify(user), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.send({ message: 'login success' });
  }

  // 가드를 사용하는 로그인 메서드. 가드가 true를 반환해야 이 메서드가 실행된다.
  @UseGuards(LoginGuard)
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    // 가드 내부에서는 쿠키 설정을 할 수 없으므로 컨트롤러에서 해준다.
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        // maxAge: 1000 * 60 * 60 * 24 * 7,
        maxAge: 10, // 로그인 테스트를 위해 10초로 설정
      });
    }
    return res.send({ message: 'login using guard success' });
  }

  // 로그인 된 때만 실행 가능한 메서드.
  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인 된 상태에서만 이 글이 보입니다';
  }

  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }
}
