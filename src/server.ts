import express from 'express';

import Middlewares from './config/middlewares';
import Routes from './config/routes';
import Database from './database';

import Log from './services/log';

import 'express-async-errors';
import 'dotenv/config';

const { NOME_SERVICO, PORT } = process.env;

class Server {
  app: express.Application;

  constructor() {
    this.app = express();

    Database.mysql();
    Middlewares(this.app);
    Routes(this.app);

    this.handleErros();
    this.start();
  }

  private handleErros() {
    this.app.use(async (err: express.Errback, req, res, next) => {
      Log.enviar({
        nivel: 'erro',
        mensagem: err.toString(),
        detalhes: 'Referente a (exemplo: numero da nota, nome do usuario, etc)'
      });

      if (process.env.NODE_ENV === 'develop') {
        return res.status(500).send(err.toString());
      }

      return res.status(500).json({ error: 'internal server error.' });
    });
  }

  private start() {
    this.app.listen(PORT, () => {
      console.info(`${NOME_SERVICO} executando na porta ${PORT}`);
    });
  }
}

module.exports = new Server();
