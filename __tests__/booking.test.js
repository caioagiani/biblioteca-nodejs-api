import Book from '../src/app/models/Book';
import Booking from '../src/app/models/Booking';
import User from '../src/app/models/User';
import { bookRequests } from './utils/book.requests';
import { bookingsRequests } from './utils/booking.requests';
import { userRequests } from './utils/user.requests';

describe('Booking', () => {
  const environments = {};

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await Book.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();
  });

  it('should create a new booking', async () => {
    const userResponse = await userRequests.createUser({
      permission: 'administrator',
    });

    environments.token = userResponse.body.id;

    const bookResponse = await bookRequests.createBook({
      token: environments.token,
    });

    environments.book_id = bookResponse.body.id;

    const options = {
      token: environments.token,
      body: {
        book: environments.book_id,
        user: environments.token,
        reservation: '2021-03-12',
        devolution: '2021-03-15',
      },
    };

    const { body, status } = await bookingsRequests.createBooking(options);

    environments.booking_id = body.id;

    expect(status).toBe(201);
    expect(body).toHaveProperty('status');
  });

  it('should list all bookings', async () => {
    const { body, status } = await bookingsRequests.indexBookings({
      token: environments.token,
    });

    expect(status).toBe(200);
    expect(body).toHaveProperty('bookings');
  });

  it('should return books filtered by the search', async () => {
    const options = {
      search: 'NodeJS',
      token: environments.token,
    };

    const { body, status } = await bookingsRequests.showBookings(options);

    expect(status).toBe(200);
    expect(body).toHaveProperty('bookings');
  });

  it('should update bookings with finalized status', async () => {
    const options = {
      booking_id: environments.booking_id,
      token: environments.token,
      body: {
        status: 'finished',
      },
    };

    const { body, status } = await bookingsRequests.updateBookings(options);

    expect(status).toBe(200);
    expect(body).toHaveProperty('status');
  });

  it('should delete book', async () => {
    const options = {
      booking_id: environments.booking_id,
      token: environments.token,
    };

    const { body, status } = await bookingsRequests.deleteBookings(options);

    expect(status).toBe(200);
    expect(body).toHaveProperty('status');
  });
});
