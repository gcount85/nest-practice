import {
  Param,
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity'; // MySQL에서 받아오는 User 엔티티
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // 객체나 클래스의 인스턴스를 직접 반환해도 NestJS가 자동으로 JSON으로 변환해준다!
  // 익스프레스에서 JSON.stringfy()를 쓰지 않으면 에러가 났던 것과 다르다.
  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  @Post()
  async createUser(@Body() newUser: User): Promise<User> {
    return await this.userService.createUser(newUser);
  }

  @Get(':email')
  async getUser(@Param('email') email: string): Promise<User> {
    return await this.userService.getUser(email);
  }

  @Put(':email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateUser: User,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(email, updateUser);
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string): Promise<DeleteResult> {
    return await this.userService.deleteUser(email);
  }
}
