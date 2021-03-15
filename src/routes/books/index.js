import BookController from '../../app/controllers/BookController';

export default (booksRoute) => {
  booksRoute
    .get('/', BookController.index)
    .get('/:title', BookController.show)
    .post('/', BookController.store)
    .patch('/:id', BookController.update)
    .delete('/:id', BookController.delete);
};
