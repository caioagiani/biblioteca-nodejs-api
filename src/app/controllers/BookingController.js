import BookingRepository from '../repositories/BookingRepository';
import BookRepository from '../repositories/BookRepository';

export default {
  async index(req, res) {
    const { skip, limit } = req.query;

    const options = { skip, limit };

    const total = await BookingRepository.count(options);
    const bookings = await BookingRepository.find(options);

    return res.json({ total, bookings });
  },
  async show(req, res) {
    const { value, skip, limit } = req.query;

    if (!value) {
      return res.status(400).json({ error: 'Nenhuma reserva foi encontrada.' });
    }

    const findBook = await BookRepository.find({
      query: {
        $or: [
          { title: { $regex: value, $options: 'i' } },
          { author: { $regex: value, $options: 'i' } },
          { category: { $regex: value, $options: 'i' } },
        ],
      },
    });

    if (!findBook || findBook.length <= 0) {
      return res.status(400).json({ error: 'Nenhuma reserva foi encontrada.' });
    }

    const options = {
      query: { book: findBook[0]._id },
      skip,
      limit,
    };

    const total = await BookingRepository.count(options);
    const bookings = await BookingRepository.find(options);

    return res.json({ total, bookings });
  },
  async store(req, res) {
    try {
      const bokking = await BookingRepository.create(req.body);

      return res.status(201).json(bokking);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;

    const options = {
      id,
      body: req.body,
    };

    try {
      const updateBookings = await BookingRepository.update(options);

      if (!updateBookings) {
        return res.status(400).json({ error: 'Não encontrado nenhum ID.' });
      }

      return res.json(updateBookings);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const deleteBooking = await BookingRepository.delete(id);

    return res.json(deleteBooking);
  },
};
