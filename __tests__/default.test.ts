import request from 'supertest';
import app from '../src/app';
// import truncate from './util/truncate';

describe('Apidoc', () => {
  it('Get All Users', async () => {
    const response = await request(app).get('/users?since=1');

    expect(response.status).toBe(200);
  });

  it('Should returns errors because since is a word, not a number', async () => {
    const response = await request(app).get('/users?since=test');

    expect(response.status).toBe(400);
  });

  it('Get Details of username', async () => {
    const response = await request(app).get('/users/MatheusLuiz2000/details');

    expect(response.status).toBe(200);
  });

  it('Get Repo of a user', async () => {
    const response = await request(app).get('/users/MatheusLuiz2000/repos');

    expect(response.status).toBe(200);
  });
});
