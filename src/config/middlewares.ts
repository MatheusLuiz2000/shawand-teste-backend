// eslint-disable-next-line no-unused-vars
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
// import passport from './passport';

const Middlewares = (app: express.Application) => {
  app.use(bodyParser.json());
  app.use(cors({ origin: '*' }));
  // app.use(passport.authenticate());
  // app.use(express.static(path.resolve('./apidoc')));
  app.use(express.static(path.resolve('./_tests_/coverage/lcov-report')));
  app.use((req, res, next) => {
    const objeto_req = {
      headers: req.headers
    };
    process.env.HEADERS_GLOBAIS = JSON.stringify(objeto_req);
    return next();
  });
};

export default Middlewares;
