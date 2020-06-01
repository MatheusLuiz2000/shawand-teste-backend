// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';

import ReceitaController from './app/controllers/ReceitaController';
import ReceitaValidator from './app/validators/ReceitaValidator';

const routes = new Router();
// teste
// routes.get('/', ReceitaController.docs); // Rota para a documentação
routes.get('/:documento', ReceitaController.listar);
routes.post('/consulta', ReceitaController.consultaReceita);
routes.get('/health', ReceitaController.health);
export default routes;
