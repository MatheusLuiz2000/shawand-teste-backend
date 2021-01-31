// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';
import GitHubController from './app/controllers/GitHubController';

const routes = new Router();
// teste
routes.get('/users', GitHubController.listUsers);
routes.get('/users/:username/details', GitHubController.listUser);
routes.get('/users/:username/repos', GitHubController.listRepository);
export default routes;
