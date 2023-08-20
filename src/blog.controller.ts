import {
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Controller,
} from '@nestjs/common';

@Controller('blog')
export class BlogController {
  @Get()
  getAllPosts() {
    return;
  }

  @Post()
  createPost(@Body() post: any) {
    console.log(post);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 가져오기`);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 삭제`);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() post: any) {
    console.log(`[id: ${id}] 게시글 업데이트 내용 ${post}`);
  }
}
