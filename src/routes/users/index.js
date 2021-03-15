import UserController from '../../app/controllers/UserController';

export default (usersRoute) => {
  usersRoute
    .get('/', UserController.index)
    .get('/:email', UserController.show)
    .post('/', UserController.store);
};
