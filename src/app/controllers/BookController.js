import BookRepository from '../repositories/BookRepository';

export default {
  async index(req, res) {
    const { skip, limit } = req.query;

    const options = { skip, limit };

    const total = await BookRepository.count(options);
    const books = await BookRepository.find(options);

    return res.json({ total, books });
  },
  async show(req, res) {
    const { title } = req.params;
    const { skip, limit } = req.query;

    const options = {
      query: {
        title: { $regex: title, $options: 'i' },
      },
      skip,
      limit,
    };

    const total = await BookRepository.count(options);
    const books = await BookRepository.find(options);

    return res.json({ total, books });
  },
  async store(req, res) {
    const { title } = req.body;

    const options = {
      query: {
        title,
      },
    };

    const findBookExists = await BookRepository.find(options);

    if (findBookExists && findBookExists.length >= 1) {
      return res
        .status(400)
        .json({ error: 'Este livro já está cadastrado no sistema.' });
    }

    try {
      const book = await BookRepository.create(req.body);

      return res.status(201).json(book);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;

    const options = {
      id,
      body: req.body,
    };

    try {
      const updateBook = await BookRepository.update(options);

      if (!updateBook) {
        return res.status(400).json({ error: 'Não encontrado nenhum ID.' });
      }

      return res.json(updateBook);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    try {
      const deleteBook = await BookRepository.delete(id);

      return res.json(deleteBook);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
