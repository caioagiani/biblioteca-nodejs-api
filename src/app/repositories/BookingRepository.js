import Booking from '../models/Booking';

export default {
  async create(data) {
    const booking = await Booking.create(data);

    return booking;
  },
  async findById(id) {
    const findBooking = await Booking.findById(id);

    return findBooking;
  },
  async find(data) {
    const options = {
      query: data.query || {},
      skip: data.skip || 0,
      limit: data.limit || 0,
    };

    const findAllBookings = await Booking.find(options.query)
      .skip(Number(options.skip))
      .limit(Number(options.limit))
      .sort({ createdAt: -1 })
      .populate(['book', 'user']);

    return findAllBookings;
  },
  async count({ query }) {
    const findQuery = query || {};

    console.log(findQuery);

    const count = await Booking.find(findQuery).countDocuments();

    return count;
  },
  async update(data) {
    const { id, body } = data;

    const updateBooking = await Booking.findByIdAndUpdate(id, body, {
      new: true,
    });

    return updateBooking;
  },
  async delete(id) {
    const deleteBooking = await Booking.findByIdAndDelete(id);

    return deleteBooking;
  },
};
