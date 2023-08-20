import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogFileRepository) {}

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
