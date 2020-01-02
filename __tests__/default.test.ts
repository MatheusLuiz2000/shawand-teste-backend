import request from 'supertest';
import { Server } from '../src/server';

const server = new Server();

function get(url) {
  const httpRequest = request(server.app).get(url);
  httpRequest.set('Accept', 'application/json');
  return httpRequest;
}

describe('Apidoc', () => {
  it('sucesso ao acessar a documentação', async done => {
    await get('/').expect(200);
    done();
  });
});
