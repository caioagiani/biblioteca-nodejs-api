import Book from '../src/app/models/Book';
import User from '../src/app/models/User';
import { bookRequests } from './utils/book.requests';
import { userRequests } from './utils/user.requests';

describe('Book', () => {
  const environments = {};

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await Book.deleteMany();
    await User.deleteMany();
  });

  it('should create a new book', async () => {
    const userResponse = await userRequests.createUser({
      permission: 'administrator',
    });

    environments.token = userResponse.body.id;

    const { body, status } = await bookRequests.createBook({
      token: environments.token,
    });

    environments.book_id = body.id;

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should list all books', async () => {
    const { body, status } = await bookRequests.indexBooks({
      token: environments.token,
    });

    expect(status).toBe(200);
    expect(body).toHaveProperty('books');
  });

  it('should return books filtered by the search', async () => {
    const options = {
      search: 'NodeJS',
      token: environments.token,
    };

    const { body, status } = await bookRequests.showBooks(options);

    expect(status).toBe(200);
    expect(body).toHaveProperty('books');
  });

  it('should update the book title', async () => {
    const options = {
      book_id: environments.book_id,
      token: environments.token,
      body: {
        title: 'Ruby on Rails',
      },
    };

    const { body, status } = await bookRequests.updateBook(options);

    expect(status).toBe(200);
    expect(body).toHaveProperty('title');
  });

  it('should delete book', async () => {
    const options = {
      book_id: environments.book_id,
      token: environments.token,
    };

    const { body, status } = await bookRequests.deleteBook(options);

    expect(status).toBe(200);
    expect(body).toHaveProperty('title');
  });
});
