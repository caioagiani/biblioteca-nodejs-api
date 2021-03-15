import { connect } from 'mongoose';

const { DB_USER, DB_PASS, DB_NAME, DB_HOST, NODE_ENV } = process.env;

connect(`mongodb://${DB_HOST}:27017`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  user: DB_USER,
  pass: DB_PASS,
  dbName: NODE_ENV === 'test' ? `${NODE_ENV}_test` : DB_NAME,
});

export default connect;
