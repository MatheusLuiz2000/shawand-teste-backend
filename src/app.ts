import './bootstrap';

import Youch from 'youch';
import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import routes from './routes';

// AWSXRay.captureHTTPsGlobal(require('http'), false);
// AWSXRay.captureHTTPsGlobal(require('https'), false);

// AWSXRay.capturePromise();

class App {
  server: express.Application;

  constructor() {
    this.server = express();

    this.cors();
    this.middlewares();
    this.routes();
    // this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.get('/health', (req, res) => res.status(200).send('OK'));
    this.server.use(routes);
  }

  cors() {
    this.server.use(cors());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'develop') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
