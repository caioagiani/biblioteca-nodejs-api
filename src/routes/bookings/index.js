import BookingController from '../../app/controllers/BookingController';

export default (bookingsRoute) => {
  bookingsRoute
    .get('/', BookingController.index)
    .get('/:search', BookingController.show)
    .post('/', BookingController.store)
    .patch('/:id', BookingController.update)
    .delete('/:id', BookingController.delete);
};
