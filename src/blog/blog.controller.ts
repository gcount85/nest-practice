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

@Controller('blog') // {서버주소}/blog 이하의 요청을 처리한다는 뜻
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getAllPosts() {
    return await this.blogService.getAllPosts();
  }

  @Post()
  async createPost(@Body() postDto: any) {
    console.log(postDto);
    return await this.blogService.createPost(postDto);
  }

  @Get(':id') // URL 주소로 사용할 값
  async getPost(@Param('id') id: string) {
    // URL의 `id` 값을 id 변수에 할당
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
    // HTTP 요청의 body를 `postDto` 변수에 할당
    console.log(`[id: ${id}] 게시글 업데이트 내용 ${postDto}`);
    return await this.blogService.updatePost(id, postDto);
  }
}
