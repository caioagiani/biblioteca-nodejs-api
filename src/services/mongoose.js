import { connect } from 'mongoose';

connect(
  `mongodb://${process.env.DB_NAME}:${process.env.DB_PASS}@${process.env.DB_HOST}:27017/admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

export default connect;
