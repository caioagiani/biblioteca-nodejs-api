import UserRepository from '../repositories/UserRepository';
import { parse, parseMany } from '../views/UserView';

export default {
  async index(req, res) {
    const { skip, limit } = req.query;

    const options = { skip, limit };

    const total = await UserRepository.count(options);
    const users = await UserRepository.find(options);

    return res.json({ total, users: parseMany(users) });
  },
  async show(req, res) {
    const { email } = req.params;
    const { skip, limit } = req.query;

    const options = {
      query: {
        email: { $regex: email, $options: 'i' },
      },
      skip,
      limit,
    };

    const total = await UserRepository.count(options);
    const users = await UserRepository.find(options);

    return res.json({ total, users: parseMany(users) });
  },
  async store(req, res) {
    const { email } = req.body;

    const options = {
      query: {
        email,
      },
    };

    const findUserExists = await UserRepository.find(options);

    if (findUserExists.length >= 1) {
      return res
        .status(400)
        .json({ error: 'Este e-mail já está cadastrado no sistema' });
    }

    try {
      const user = await UserRepository.create(req.body);

      return res.status(201).json(parse(user));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
