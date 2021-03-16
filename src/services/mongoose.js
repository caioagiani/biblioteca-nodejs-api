import { connect } from 'mongoose';

const { DB_USER, DB_PASS, DB_NAME, DB_HOST, NODE_ENV } = process.env;

const DB = NODE_ENV === 'test' ? `${NODE_ENV}_test` : DB_NAME;

connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017/${DB}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
)
  .then((result) => {
    console.log('CONECTADO PORRA');
  })
  .catch((err) => {
    console.error('DEU ERRO EM ', err);
  });

export default connect;
