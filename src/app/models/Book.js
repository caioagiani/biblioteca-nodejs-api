import { Schema, model } from 'mongoose';

const BookSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Book', BookSchema);
