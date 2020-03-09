// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import path from 'path';
import receitalib from 'receitaws';
import Log from 'log-gcb';
import ReceitaSchema from '../squemas/ReceitaSchema';
import mongoose from 'mongoose';

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

    const ReceitaAnaliseModel = mongoose.model(
      'receita',
      ReceitaSchema,
      'receita'
    );

    const opt = {
      timeout: 2000
    }

    const receita = receitalib(opt)

    // faz a requisição
    receita(cnpj).then(dados => {
      console.log(dados);
      if(dados.status !== 200) {
        return res.status(400).json({
          mensagem: 'Algo deu errado! Tente novamente'
        });
      }

      if(dados.data.status === 'ERROR') {
        Log.enviar({
          nivel: `erro`,
          mensagem: `Nao foi possivel localizar o cliente de cnpj ${cnpj}`,
          detalhes: `${dados.data.message}`
        });

        return res.status(404).json({
          mensagem: 'CNPJ não foi encontrado. Tenta novamente!'
        });
      }

      ReceitaAnaliseModel.create({
        cliente_id : id,
        json_receita: dados.data
      });

      return res.status(200).json(dados.data);
    }).catch(err => {
      Log.enviar({
        nivel: `erro`,
        mensagem: `Nao foi possivel conectar com a api da receita`,
        detalhes: `${err}`
      });

      return res.status(400).json({
        mensagem: 'Não foi possível conectar com a API da Receita'
      });
    })

  };
}

export default new Receita();
