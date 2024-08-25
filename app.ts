declare global {
  var ENV: string;
  var DB_HOST: string;
  var DB_USER: string;
  var DB_PASSWORD: string;
  var DB_DATABASE: string;
}
import 'dotenv/config';

import express from 'express';
import db from 'libs/db';
import bodyParser from 'body-parser';
import cors from 'cors';

global.ENV = process.env.NODE_ENV || 'development';

import exampleRoutes from 'routes/example.route';

const app = express();

app.use(bodyParser.json());

//todo: check for production cors
app.use(cors());

// Your routes
app.use('/example', exampleRoutes);

const start = async () => {
  console.log('ENV:', ENV);
  app.listen(process.env.PORT, () => console.info(`Server started on port ${process.env.PORT}`));

  if (process.env.DB_HOST) {
    await db.migrate.latest().then(() => console.log(`DB migrated: ${process.env.DB_DATABASE}`));
  }
};

start();
