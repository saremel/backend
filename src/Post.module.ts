import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostController } from './Post.controller';
import { PostService } from './Post.service';
import { PostSchema } from './Post.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
