import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';

export interface BlogRepository {
  getAllPosts(): Promise<PostDto[]>;
  createPost(postDto: PostDto): Promise<string>;
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string): Promise<string>;
  updatePost(id: string, postDto: PostDto): Promise<PostDto>;
}

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
