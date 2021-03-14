const parse = ({ _id, title, author, category, createdAt, updatedAt }) => ({
  id: _id,
  title,
  author,
  category,
  created_at: createdAt,
  updated_at: updatedAt,
});

const parseMany = (books) => books.map((book) => parse(book));

export { parse, parseMany };
