import './bootstrap';

import AWSXRay from 'aws-xray-sdk'
AWSXRay.captureHTTPs(require('http'));
import Youch from 'youch';
import express from 'express';
import 'express-async-errors';

import Log from 'log-gcb';
import cors from 'cors';
import logConfig from './config/logConfig';

import routes from './routes';

import './database';

class App {
  server: express.Application;

  constructor() {
    this.server = express();

    this.logs();
    this.cors();
    this.middlewares();
    this.routes();
    // this.exceptionHandler();
  }

  logs() {
    Log.setConfig(logConfig);
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.get('/health', (req, res) => res.status(200).send('OK'));
    this.server.use(AWSXRay.express.openSegment('Receita'));
    this.server.use(routes);
    this.server.use(AWSXRay.express.closeSegment());
  }

  cors() {
    this.server.use(cors());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'develop') {
        const errors = await new Youch(err, req).toJSON();

        Log.enviar({
          nivel: 'erro',
          mensagem: 'ErrBack: Erro da Api',
          detalhes: err.toString()
        });
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
