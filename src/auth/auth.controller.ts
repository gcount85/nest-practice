import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // CreateUserDto를 사용하면 cross-validator가 자동으로 유효성 검증한다.
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    // validateUser를 호출해 유저 정보 확인
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password, // 여기서 DB 보안화 안 필요한가?
    );

    // 유저 확인 되면 응답에 유저 정보를 담은 쿠키를 반환
    res.cookie('login', JSON.stringify(user), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.send({ message: 'login success' });
  }

  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }
}
