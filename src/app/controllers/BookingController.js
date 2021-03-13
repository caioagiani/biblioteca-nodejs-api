import BookingRepository from '../repositories/BookingRepository';

export default {
  async index(req, res) {
    const bookings = await BookingRepository.findAll(req.query);

    return res.json(bookings);
  },
  async show(req, res) {
    const { name } = req.params;

    const booking = await BookingRepository.findOne(name, req.query);

    return res.json(booking);
  },
  async store(req, res) {
    const booking = await BookingRepository.create(req.body);

    return res.json(booking);
  },
  async update(req, res) {
    const { id } = req.params;

    const updateBooking = await BookingRepository.update(id, req.body);

    return res.json(updateBooking);
  },
  async delete(req, res) {
    const { id } = req.params;

    const deleteBooking = await BookingRepository.delete(id);

    return res.json(deleteBooking);
  },
};
