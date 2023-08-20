import { PostDto } from './blog.model';

export class BlogService {
  posts = [];

  getAllPosts() {
    return this.posts;
  }

  createPost(postDto: PostDto) {
    const id = this.posts.length + 1;
    this.posts.push({ id: id.toString(), ...postDto, createdDt: new Date() });
    return id;
  }

  getPost(id: string) {
    const post = this.posts.find((post) => post.id === id);
    console.log(post);
    return post;
  }

  deletePost(id: string) {
    const filteredPosts = this.posts.filter((post) => post.id !== id);
    this.posts = [...filteredPosts];
    return id;
  }

  updatePost(id: string, postDto: PostDto) {
    let updateIndex = this.posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updateDt: new Date() };
    this.posts[updateIndex] = updatePost;
    return updatePost;
  }
}
