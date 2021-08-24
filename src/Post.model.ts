import * as mongoose from 'mongoose';
export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },

    description: {
      type: String,
      require: true,
    },

    actors: {
      type: Array,
      require: true,
    },

    photo: {
      type: String,
      require: false,
    },

    categories: {
      type: Array,
      require: true,
    },

    postId: {
      type: String,
      require: true,
      unique: true,
    },

    imdbRate: {
      type: Number,
      require: false,
    },
  },
  { timestamps: true },
);

import { Document } from 'mongoose';

export interface Post extends Document {
  title: string;
  description: string;
  actors: any;
  categories: any;
  postId: string;
  imdbRate: number;
}
