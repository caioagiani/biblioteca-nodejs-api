import express from 'express';

import 'express-group-routes';

import bookings from './bookings';
import books from './books';
import docs from './docs';
import users from './users';

const router = express.Router();

router.group('/api/v1', (routes) => {
  router.group('/docs', docs);
  routes.group('/users', users);
  routes.group('/books', books);
  routes.group('/bookings', bookings);
});

export { router };
