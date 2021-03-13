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
      .sort({ createdAt: -1 });

    return findAllBookings;
  },
  async count(query) {
    const filterQuery = query || {};

    const count = await Booking.find(filterQuery).countDocuments();

    return count;
  },
  async update(id, data) {
    try {
      const updateBook = await Book.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updateBook) {
        return res.status(400).json({ error: 'Não encontrado nenhum ID.' });
      }

      return updateBook;
    } catch (error) {
      return { error: error.message };
    }
  },
  async delete(id) {
    try {
      const deleteBook = await Book.findByIdAndDelete(id);

      if (!deleteBook) {
        return res.status(400).json({ error: 'Não encontrado nenhum ID.' });
      }

      return deleteBook;
    } catch (error) {
      return { error: error.message };
    }
  },
};
