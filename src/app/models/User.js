import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  permission: {
    type: String,
    enum: ['common', 'administrator'],
    default: 'common',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default model('User', UserSchema);
