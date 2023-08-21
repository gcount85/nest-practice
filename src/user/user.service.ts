import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  // `User` 엔터티 타입의 `Repository` 객체를 생성하여 userRepository 변수에 주입
  // 이 userRepository는 TypeORM의 기본 CRUD 작업을 수행하는 메소드를 제공
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Repository<Entity>
  ) {}

  async createUser(newUser) {}
  async getUser(email) {}
  async updateUser(email, updateUser) {}
  async deleteUser(email) {}
}
