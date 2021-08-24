import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './Post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async insertPost(
    title: string,
    description: string,
    actors: any,
    categories: any,
    imdbRate: number,
  ) {
    const newPost = new this.postModel({
      title,
      description,
      actors,
      categories,
      imdbRate,
    });
    const result = await newPost.save();
    return result.id as string;
  }

  async getPosts() {
    const posts = await this.postModel.find().exec();
    return posts.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      actors: prod.actors,
      categories: prod.categories,
      imdbRate: prod.imdbRate,
    }));
  }

  async getSinglePost(postId: string) {
    const post = await this.findPost(postId);
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      actors: post.actors,
      categories: post.categories,
      imdbRate: post.imdbRate,
    };
  }

  async updatePost(
    postId: string,
    title: string,
    description: string,
    actors: any,
    categories: any,
    imdbRate: number,
  ) {
    const updatedPost = await this.findPost(postId);
    if (title) {
      updatedPost.title = title;
    }
    if (description) {
      updatedPost.description = description;
    }
    if (actors) {
      updatedPost.actors = actors;
    }
    if (imdbRate) {
      updatedPost.imdbRate = imdbRate;
    }
    updatedPost.save();
  }

  async deletePost(postId: string) {
    const result = await this.postModel.deleteOne({ _id: postId }).exec();
    if (result.n == 0) {
      throw new NotFoundException('Could not find product');
    }
  }

  private async findPost(id: string): Promise<Post> {
    let post;
    try {
      post = await this.postModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find post.');
    }
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
