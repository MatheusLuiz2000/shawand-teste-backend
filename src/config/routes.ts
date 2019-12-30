// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';

import Welcome from '../app/controllers/welcome';

const Routes = (app: express.Application) => {
  const routes = Router();

  routes.get('/', Welcome.hello);

  app.use(routes);
};

export default Routes;
