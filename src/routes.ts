// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';

import ReceitaController from './app/controllers/ReceitaController';
import ReceitaValidator from './app/validators/ReceitaValidator';

const routes = new Router();

// routes.get('/', ReceitaController.docs); // Rota para a documentação
routes.get('/health', ReceitaValidator,ReceitaController.health); // Rota para o health check
routes.post('/consulta/:id', ReceitaController.consultaReceita); // Rota para o health check

export default routes;
