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
  getAllPosts() {
    return this.blogService.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto: any) {
    console.log(postDto);
    return this.blogService.createPost(postDto);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 가져오기`);
    return this.blogService.getPost(id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 삭제`);
    return this.blogService.deletePost(id);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() postDto: any) {
    console.log(`[id: ${id}] 게시글 업데이트 내용 ${postDto}`);
    return this.blogService.updatePost(id, postDto);
  }
}
