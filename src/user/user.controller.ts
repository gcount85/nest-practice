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
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return await this.userService.createUser(newUser);
  }

  @Get(':email')
  async getUser(@Param('email') email: string): Promise<User> {
    return await this.userService.getUser(email);
  }

  @Put(':email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(email, updateUser);
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string): Promise<DeleteResult> {
    return await this.userService.deleteUser(email);
  }
}
