import '../../src/services/mongoose';

import request from 'supertest';

import { app } from '../../src/app';

const userRequests = {
  async createUser(body = {}) {
    const bodyRequest = {
      name: 'Caio Agiani',
      email: 'caio.agiani14@gmail.com',
      password: '123123',
      ...body,
    };

    const usersResponse = await request(app)
      .post('/api/v1/users')
      .send(bodyRequest);

    return usersResponse;
  },
  async indexUsers({ token }) {
    const usersResponse = await request(app)
      .get('/api/v1/users')
      .set('authorization_id', token);

    return usersResponse;
  },
  async showUsers({ search, token }) {
    const usersResponse = await request(app)
      .get(`/api/v1/users/${search}`)
      .set('authorization_id', token);

    return usersResponse;
  },
  async updateUser({ user_id, body, token }) {
    const usersResponse = await request(app)
      .patch(`/api/v1/users/${user_id}`)
      .set('authorization_id', token)
      .send(body);

    return usersResponse;
  },
};

export { userRequests };
