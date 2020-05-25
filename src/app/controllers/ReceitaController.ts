import { Request, Response } from 'express';
import path from 'path';
import receitalib from 'receitaws';
import Log from 'log-gcb';
import 'dotenv/config';
import Consulta from '../models/Consulta';

class Receita {
  docs = (req, res) => {
    res.sendFile(path.resolve('./apidoc/index.html'));
  };

  testes = (req, res) => {
    res.sendFile(path.resolve('./__tests__/coverage/lcov-report/index.html'));
  };

  health = (req, res) => {
    res.status(200).send('OK');
  };

  consultaReceita = async (req, res) => {
    let { cnpj } = req.body;
    const { id } = req.params;

    cnpj = cnpj.replace(/[^\w\s]/gi, '');

    const opt = {
      timeout: 3000,
      token: 'ac4c6cd88befb569350b22b3112ef27f48e732f101cd2c14e0bf8b26e9dd6b8c'
    };

    const receita = receitalib(opt);

    receita(cnpj, 180)
      .then(dados => {
        if (dados.status !== 200) {
          return res.status(400).json({
            mensagem: 'Algo deu errado! Tente novamente'
          });
        }

        if (dados.data.status === 'ERROR') {
          Log.erro(
            process.env.HEADERS_GLOBAIS,
            `Nao foi possivel localizar o cliente de cnpj ${cnpj}`,
            dados.data
          );

          return res.status(404).json({
            mensagem: 'CNPJ não foi encontrado. Tenta novamente!'
          });
        }

        Consulta.create({
          documento: cnpj,
          dados: dados.data,
          documento_valido: true,
          atividade_principal: null
        });

        return res.status(200).json(dados.data);
      })
      .catch(err => {
        Log.erro(
          process.env.HEADERS_GLOBAIS,
          `Nao foi possivel conectar com a api da receita`,
          { erro: err }
        );

        return res.status(400).json({
          mensagem: 'Não foi possível conectar com a API da Receita'
        });
      });
  };
}

export default new Receita();
