import { connect, connection } from 'mongoose';

const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

connection.on('error', () => console.error('ERROR CONNECTION'));
connection.once('open', () => console.error('SUCCESS CONNECTION'));

export default connect;
