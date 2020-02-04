import request from 'supertest';
import app from '../src/app';
// import truncate from './util/truncate';

describe('Apidoc', () => {
  // beforeEach(async () => {
  //   await truncate();
  // });

  it('sucesso ao acessar a documentação', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
  });
});
