// eslint-disable-next-line no-unused-vars
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from './passport';

const Middlewares = (app: express.Application) => {
  app.use(bodyParser.json());
  app.use(cors({ origin: '*' }));
  // app.use(passport.authenticate());
};

export default Middlewares;
