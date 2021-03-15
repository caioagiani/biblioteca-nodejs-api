import '../../src/services/mongoose';

import request from 'supertest';

import { app } from '../../src/app';

const bookRequests = {
  async createBook({ body, token }) {
    const bodyRequest = {
      title: 'NodeJS',
      author: 'Caio Agiani',
      category: 'tech',
      ...body,
    };

    const booksResponse = await request(app)
      .post('/api/v1/books')
      .set('authorization_id', token)
      .send(bodyRequest);

    return booksResponse;
  },
  async indexBooks({ token }) {
    const booksResponse = await request(app)
      .get('/api/v1/books')
      .set('authorization_id', token);

    return booksResponse;
  },
  async showBooks({ search, token }) {
    const booksResponse = await request(app)
      .get(`/api/v1/books/${search}`)
      .set('authorization_id', token);

    return booksResponse;
  },
  async updateBook({ book_id, body, token }) {
    const booksResponse = await request(app)
      .patch(`/api/v1/books/${book_id}`)
      .set('authorization_id', token)
      .send(body);

    return booksResponse;
  },
  async deleteBook({ book_id, token }) {
    const booksResponse = await request(app)
      .delete(`/api/v1/books/${book_id}`)
      .set('authorization_id', token);

    return booksResponse;
  },
};

export { bookRequests };
