const parse = ({ _id, permission, name, email }) => ({
  id: _id,
  name,
  email,
  permission,
});

const parseMany = (users) => users.map((user) => parse(user));

export { parse, parseMany };
