import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    // 기존에 존재하는 유저인지 검색
    const user = await this.userService.getUser(createUserDto.email);

    // 이미 존재하는 유저 예외처리
    if (user) {
      throw new HttpException(
        '이미 존재하는 유저입니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 비밀번호 암호화
    const encryptedPassword = bcrypt.hashSync(createUserDto.password, 10);

    // 유저 등록
    try {
      const user = await this.userService.createUser({
        ...createUserDto,
        password: encryptedPassword,
      });
      user.password = undefined; // 보안을 위해 반환하는 유저 정보의 패스워드 값을 삭제해야 한다.
      return user;
    } catch (error) {
      throw new HttpException('서버 에러', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser() {
    // return await this.userService.getUser();
  }

  async logout() {
    return;
  }
}
