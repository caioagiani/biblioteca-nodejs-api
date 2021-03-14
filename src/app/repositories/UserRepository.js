import User from '../models/User';

export default {
  async create(data) {
    const createUser = await User.create(data);

    return createUser;
  },
  async findById(id) {
    const findUser = await User.findById(id);

    return findUser;
  },
  async find(data) {
    const options = {
      query: data.query || {},
      skip: data.skip || 0,
      limit: data.limit || 0,
    };

    const findAllUsers = await User.find(options.query)
      .skip(Number(options.skip))
      .limit(Number(options.limit))
      .sort({ createdAt: -1 });

    return findAllUsers;
  },
  async count({ query }) {
    const findQuery = query || {};

    const count = await User.find(findQuery).countDocuments();

    return count;
  },
};
