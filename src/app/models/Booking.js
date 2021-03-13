import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  reservation: {
    type: Date,
    required: true,
  },
  devolution: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'finished'],
    default: 'active',
  },
});

export default model('Booking', BookingSchema);
