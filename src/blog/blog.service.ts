import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogMongoRepository } from './blog.repository';

@Injectable()
export class BlogService {
  // blogRepository 의존성을 몽고 리포지토리로 변경
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    return await this.blogRepository.getAllPosts();
  }

  async createPost(postDto: PostDto) {
    return await this.blogRepository.createPost(postDto);
  }

  async getPost(id: string) {
    return await this.blogRepository.getPost(id);
  }

  async deletePost(id: string) {
    return await this.blogRepository.deletePost(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    return await this.blogRepository.updatePost(id, postDto);
  }
}
