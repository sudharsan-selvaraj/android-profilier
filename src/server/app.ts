import express, { Request } from 'express';
import bodyParser from 'body-parser';
import { getRouter } from './routes';
import cors from 'cors';

export const getExpressApp = () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(getRouter());
  app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    next();
  });
  return app;
};
