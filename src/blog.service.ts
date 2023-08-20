import { PostDto } from './blog.model';
import { BlogFileRepository } from './blog.repository';

export class BlogService {
  blogFileRepository: BlogFileRepository;
  constructor() {
    this.blogFileRepository = new BlogFileRepository();
  }

  async getAllPosts() {
    return await this.blogFileRepository.getAllPosts();
  }

  async createPost(postDto: PostDto) {
    return await this.blogFileRepository.createPost(postDto);
  }

  async getPost(id: string) {
    return await this.blogFileRepository.getPost(id);
  }

  async deletePost(id: string) {
    return await this.blogFileRepository.deletePost(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    return await this.blogFileRepository.updatePost(id, postDto);
  }
}
