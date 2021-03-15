import UserRepository from '../repositories/UserRepository';

export default async (req, res, next) => {
  const { authorization_id } = req.headers;

  try {
    const [findUser, _] = await UserRepository.find({
      query: { _id: authorization_id },
    });

    if (findUser.permission !== 'administrator') {
      return res.status(401).json({ error: 'Não autorizado.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'authorization_id não localizado.' });
  }
};
