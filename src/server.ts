import express from 'express';

import Middlewares from './config/middlewares';
import Routes from './routes';
import Database from './database';

import Log from './services/log';

import 'express-async-errors';
import 'dotenv/config';

const { NOME_SERVICO, PORT } = process.env;

class Server {
  app: express.Application;

  constructor() {
    this.app = express();

    Database.SQL();
    Middlewares(this.app);
    Routes(this.app);

    this.handleErros();
  }

  private handleErros() {
    this.app.use(async (err: any, req, res, next) => {
      Log.enviar({
        nivel: 'erro',
        mensagem: 'Error',
        detalhes: err.toString()
      });

      if (process.env.NODE_ENV === 'develop') {
        return res.status(500).send(err.toString());
      }

      return res.status(500).json({ error: 'internal server error.' });
    });
  }

  public start() {
    this.app.listen(PORT, () => {
      console.info(`${NOME_SERVICO} executando na porta ${PORT}`);
    });
  }
}
export { Server };
export default new Server().start();
