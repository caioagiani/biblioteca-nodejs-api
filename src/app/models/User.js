import crypto from 'crypto';
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
    set: (value) => crypto.createHash('md5').update(value).digest('hex'),
  },
});

export default model('User', UserSchema);
