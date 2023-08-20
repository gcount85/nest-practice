import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
  getAllPosts(): Promise<PostDto[]>;
  createPost(postDto: PostDto): Promise<string>;
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string): Promise<string>;
  updatePost(id: string, postDto: PostDto): Promise<PostDto>;
}

// BlogRepository 인터페이스를 구현한 클래스
@Injectable()
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = './src/blog.data.json';

  async getAllPosts(): Promise<PostDto[]> {
    const datas = await readFile(this.FILE_NAME, 'utf-8');
    const posts = JSON.parse(datas);
    return posts;
  }

  async createPost(postDto: PostDto): Promise<string> {
    const posts = await this.getAllPosts();
    const id = (posts.length + 1).toString();
    const createPost = { id: id, ...postDto, createdDt: new Date() };
    posts.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
    return id;
  }

  async getPost(id: string): Promise<PostDto> {
    const posts = await this.getAllPosts();
    const post = posts.find((post) => post.id === id);
    return post;
  }

  async deletePost(id: string): Promise<string> {
    const posts = await this.getAllPosts();
    const filteredPosts = posts.filter((post) => post.id !== id);
    await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    return id;
  }

  async updatePost(id: string, postDto: PostDto): Promise<PostDto> {
    const posts = await this.getAllPosts();
    const updateIndex = posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    posts[updateIndex] = updatePost;
    await writeFile(this.FILE_NAME, JSON.stringify(posts));
    return updatePost;
  }
}

@Injectable()
// 몽고디비용 리포지토리
export class BlogMongoRepository implements BlogRepository {
  // Model<BlogDocument> 타입인 blogModel 주입
  // Blog.name은 'Blog'라는 문자열을 리턴한다.
  // NestJS가 내부적으로 해당 모델을 찾고 클래스에 주입하도록 모델 생성시 사용된 동일한 이름이어야 함
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllPosts(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  async createPost(postDto: PostDto): Promise<string> {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.blogModel.create(createPost);
    return 'post 성공';
  }

  getPost(id: string): Promise<PostDto> {
    return this.blogModel.findById(id);
  }

  async deletePost(id: string): Promise<string> {
    return this.blogModel.findByIdAndDelete(id);
  }

  async updatePost(id: string, postDto: PostDto): Promise<PostDto> {
    const updatePost = { ...postDto, updatedDt: new Date() };
    return this.blogModel.findByIdAndUpdate(id, updatePost);
  }
}
