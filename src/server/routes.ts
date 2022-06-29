import { Router } from 'express';
import { RestController } from './controller';

export const getRouter = () => {
  const controller = new RestController();
  const route: Router = Router();

  route.get('/sessions', controller.getAllSessions.bind(controller));
  route.post('/sessions', controller.createNewSession.bind(controller));

  return route;
};
