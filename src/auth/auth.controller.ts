import { Body, Controller, Post } from '@nestjs/common';
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
  async login() {
    return await this.authService.validateUser();
  }

  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }
}
