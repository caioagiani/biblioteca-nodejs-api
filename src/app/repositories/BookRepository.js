import Book from '../models/Book';

export default {
  async create(data) {
    const createBook = await Book.create(data);

    return createBook;
  },
  async findById(id) {
    const findBook = await Book.findById(id);

    return findBook;
  },
  async find(data) {
    const options = {
      query: data.query || {},
      skip: data.skip || 0,
      limit: data.limit || 0,
    };

    const findAllBooks = await Book.find(options.query)
      .skip(Number(options.skip))
      .limit(Number(options.limit))
      .sort({ createdAt: -1 });

    return findAllBooks;
  },
  async count(query) {
    const filterQuery = query || {};

    const count = await Book.find(filterQuery).countDocuments();

    return count;
  },
  async update(data) {
    const { id, body } = data;

    const updateBook = await Book.findByIdAndUpdate(id, body, {
      new: true,
    });

    return updateBook;
  },
  async delete(id) {
    const deleteBook = await Book.findByIdAndDelete(id);

    return deleteBook;
  },
};
