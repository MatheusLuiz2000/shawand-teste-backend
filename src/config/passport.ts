import { Strategy } from 'passport-http-bearer';
import passport from 'passport';

const api_chave = process.env.KEY_SERVICO;

const strategy = new Strategy((key, done) => {
  if (key === api_chave) return done(null, true);
  return done('Chave incorreta');
});

passport.use(strategy);

export default {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate('bearer', { session: false })
};
