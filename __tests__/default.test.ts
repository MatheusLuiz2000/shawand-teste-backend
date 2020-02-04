import request from 'supertest';
import { Server } from '../src/server';
// import truncate from './util/truncate';

const server = new Server();

describe('Apidoc', () => {
  // beforeEach(async () => {
  //   await truncate();
  // });

  it('sucesso ao acessar a documentação', async () => {
    const response = await request(server.app).get('/health');

    expect(response.status).toBe(200);
  });
});
