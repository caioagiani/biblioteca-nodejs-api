import UserController from '../../app/controllers/UserController';
import permission from '../../app/middlewares/permission';

export default (usersRoute) => {
  usersRoute
    .post('/', UserController.store)
    /**
     * @function permission
     *
     * Necessita do authorization_id no header
     * Com permissão `administrator` para ter acesso.
     */
    .use(permission)
    .get('/', UserController.index)
    .get('/:email', UserController.show)
    .patch('/:id', UserController.update);
};
