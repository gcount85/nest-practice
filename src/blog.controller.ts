import {
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Controller,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  blogService: BlogService;
  constructor() {
    // 생성자로 블로그 서비스 객체 생성. 의존성 주입으로 대체할 수 있음.
    this.blogService = new BlogService();
  }

  @Get()
  async getAllPosts() {
    return await this.blogService.getAllPosts();
  }

  @Post()
  async createPost(@Body() postDto: any) {
    console.log(postDto);
    return await this.blogService.createPost(postDto);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 가져오기`);
    return await this.blogService.getPost(id);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 삭제`);
    return await this.blogService.deletePost(id);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() postDto: any) {
    console.log(`[id: ${id}] 게시글 업데이트 내용 ${postDto}`);
    return await this.blogService.updatePost(id, postDto);
  }
}
