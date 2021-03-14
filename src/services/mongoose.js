import { connect, connection } from 'mongoose';

const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

connect(`mongodb://${DB_HOST}:27017`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  user: DB_USER,
  pass: DB_PASS,
  dbName: DB_NAME,
});

connection.on('error', () => console.error('DATABASE: ERROR'));
connection.once('open', () => console.error('DATABASE: SUCCESS'));

export default connect;
