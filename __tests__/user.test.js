import User from '../src/app/models/User';
import { userRequests } from './utils/user.requests';

describe('User', () => {
  const environments = {};

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await User.deleteMany();
  });

  it('should create a new user', async () => {
    const { body, status } = await userRequests.createUser({
      permission: 'administrator',
    });

    environments.id = body.id;

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should not create a user with an existing email', async () => {
    const { body, status } = await userRequests.createUser();

    expect(status).toBe(400);
    expect(body.error).toBe('Este e-mail já está cadastrado no sistema.');
  });

  it('should return all users', async () => {
    const { body, status } = await userRequests.indexUsers({
      token: environments.id,
    });

    expect(status).toBe(200);
    expect(body).toHaveProperty('users');
  });

  it('should return users filtered by the search', async () => {
    const options = {
      search: 'Caio',
      token: environments.id,
    };

    const { body, status } = await userRequests.showUsers(options);

    expect(status).toBe(200);
    expect(body).toHaveProperty('users');
  });

  it('should update user with permission commom', async () => {
    const options = {
      user_id: environments.id,
      token: environments.id,
      body: {
        permission: 'commom',
      },
    };

    const { body, status } = await userRequests.updateUser(options);

    expect(status).toBe(200);
    expect(body).toHaveProperty('permission');
  });
});
