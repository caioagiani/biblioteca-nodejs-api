import BookingController from '../../app/controllers/BookingController';
import permission from '../../app/middlewares/permission';

export default (bookingsRoute) => {
  bookingsRoute
    .use(permission)
    .get('/', BookingController.index)
    .get('/:search', BookingController.show)
    .post('/', BookingController.store)
    .patch('/:id', BookingController.update)
    .delete('/:id', BookingController.delete);
};
