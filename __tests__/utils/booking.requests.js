import '../../src/services/mongoose';

import request from 'supertest';

import { app } from '../../src/app';

const bookingsRequests = {
  async createBooking({ body, token }) {
    const bodyRequest = {
      ...body,
    };

    const bookingsResponse = await request(app)
      .post('/api/v1/bookings')
      .set('authorization_id', token)
      .send(bodyRequest);

    return bookingsResponse;
  },
  async indexBookings({ token }) {
    const bookingsResponse = await request(app)
      .get('/api/v1/bookings')
      .set('authorization_id', token);

    return bookingsResponse;
  },
  async showBookings({ search, token }) {
    const bookingsResponse = await request(app)
      .get(`/api/v1/bookings/${search}`)
      .set('authorization_id', token);

    return bookingsResponse;
  },
  async updateBookings({ booking_id, body, token }) {
    const bookingsResponse = await request(app)
      .patch(`/api/v1/bookings/${booking_id}`)
      .set('authorization_id', token)
      .send(body);

    return bookingsResponse;
  },
  async deleteBookings({ booking_id, token }) {
    const bookingsResponse = await request(app)
      .delete(`/api/v1/bookings/${booking_id}`)
      .set('authorization_id', token);

    return bookingsResponse;
  },
};

export { bookingsRequests };
