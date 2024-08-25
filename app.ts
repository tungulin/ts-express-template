declare global {
  var ENV: string;
  var DB_HOST: string;
  var DB_USER: string;
  var DB_PASSWORD: string;
  var DB_DATABASE: string;
}

import express from 'express';
import db from 'libs/db';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

global.ENV = process.env.NODE_ENV || 'development';

import userRoutes from 'routes/user.route';

const app = express();

app.use(bodyParser.json());

//todo: check for production cors
app.use(cors());

app.use('/user', userRoutes);

const start = async () => {
  app.listen(process.env.PORT, () => console.info(`Server started on port ${process.env.PORT}`));

  if (process.env.DB_HOST) {
    await db.migrate.latest().then(() => console.log(`DB migrated: ${process.env.DB_DATABASE}`));
  }
};

start();
