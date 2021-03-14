const parse = ({ _id, status, book, user }) => ({
  id: _id,
  status,
  book: {
    id: book._id,
    title: book.title,
    author: book.author,
    category: book.category,
  },
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

const parseMany = (bookings) => bookings.map((booking) => parse(booking));

export { parse, parseMany };
