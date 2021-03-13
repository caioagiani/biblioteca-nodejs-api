import express from 'express';

import BookController from '../app/controllers/BookController';
import BookingController from '../app/controllers/BookingController';
import UserController from '../app/controllers/UserController';

const router = express.Router();

router
  .get('/users', UserController.index)
  .get('/users/:email', UserController.show)
  .post('/users', UserController.store)

  .get('/books', BookController.index)
  .get('/books/:title', BookController.show)
  .post('/books', BookController.store)
  .patch('/books/:id', BookController.update)
  .delete('/books/:id', BookController.delete)

  .get('/bookings', BookingController.index)
  .get('/bookings/:name', BookingController.show)
  .post('/bookings', BookingController.store)
  .patch('/bookings/:id', BookingController.update)
  .delete('/bookings/:id', BookingController.delete);

export { router };
