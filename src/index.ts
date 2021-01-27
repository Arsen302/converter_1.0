import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import userRouter from './routes/user.route';
import photoRouter from './routes/photo.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', userRouter, photoRouter);

const startConn = async () => {
  try {
    await createConnection();
    console.log('DB started working!');
  } catch (err) {
    console.log('We have Error', err);
  }
};

startConn()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
