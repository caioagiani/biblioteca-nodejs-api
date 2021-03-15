import BookController from '../../app/controllers/BookController';
import permission from '../../app/middlewares/permission';

export default (booksRoute) => {
  booksRoute
    .use(permission)
    .get('/', BookController.index)
    .get('/:title', BookController.show)
    .post('/', BookController.store)
    .patch('/:id', BookController.update)
    .delete('/:id', BookController.delete);
};
