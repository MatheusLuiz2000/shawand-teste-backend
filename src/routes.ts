// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';

import defaultController from './app/controllers/defaultController';

const Routes = (app: express.Application) => {
  const routes = Router();

  routes.get('/', defaultController.docs);
  routes.get('/hello', defaultController.hello);

  app.use(routes);
};

export default Routes;
