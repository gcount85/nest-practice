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
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Post()
  async createUser(@Body() newUser: User) {
    return await this.userService.createUser(newUser);
  }

  @Get(':email')
  async getUser(@Param('email') email: string) {
    return await this.userService.getUser(email);
  }

  @Put(':email')
  async updateUser(@Param('email') email: string, @Body() updateUser: User) {
    return await this.userService.updateUser(email, updateUser);
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    return await this.userService.deleteUser(email);
  }
}
