/* eslint-disable no-restricted-syntax */
import { Request, Response } from 'express';
import path from 'path';
import receitalib from 'receitaws';
import Log from 'log-gcb';
import 'dotenv/config';
import { Op } from 'sequelize';
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

  listar = async (req, res) => {
    let { documento } = req.params;

    if (!documento) {
      return res.status(400).json('Documento inválido');
    }

    documento = documento.replace(/[^\w\s]/gi, '');

    const dados = await Consulta.findOne({
      attributes: ['documento', 'dados', 'atividade_principal'],
      where: {
        documento
      }
    });

    console.log('dados linha 39 ', dados);

    if (!dados) {
      const opt = {
        timeout: 3000,
        token:
          'ac4c6cd88befb569350b22b3112ef27f48e732f101cd2c14e0bf8b26e9dd6b8c'
      };

      const receita = receitalib(opt);

      const resposta = await receita(documento, 180);

      console.log('no  ', resposta);

      if (resposta.status !== 200) {
        return res.status(400).json({
          mensagem: 'Algo deu errado! Tente novamente'
        });
      }

      if (resposta.data.status === 'ERROR') {
        Log.erro(
          process.env.HEADERS_GLOBAIS,
          `Nao foi possivel localizar o cliente de documento ${documento}`,
          resposta.data
        );

        return res.status(404).json({
          mensagem: 'documento não foi encontrado. Tente novamente!'
        });
      }

      const atividade_principal = resposta.data.atividade_principal[0].code;

      await Consulta.create({
        documento,
        dados: resposta.data,
        documento_valido: true,
        atividade_principal: atividade_principal || null
      });

      return res.status(200).json(resposta.data);
    }

    return res.status(200).json(dados.dados);
  };

  consultaReceita = async (req, res) => {
    let { cnpj } = req.body;

    if (!cnpj) {
      return res.status(400).json('Colocar o CNPJ');
    }

    cnpj = cnpj.replace(/[^\w\s]/gi, '');

    const opt = {
      timeout: 3000,
      token: 'ac4c6cd88befb569350b22b3112ef27f48e732f101cd2c14e0bf8b26e9dd6b8c'
    };

    const buscaCNPJ = await Consulta.findOne({
      where: {
        documento: cnpj
      }
    });

    if (buscaCNPJ) {
      return res.status(200).json(buscaCNPJ.dados);
    }

    const receita = receitalib(opt);

    receita(cnpj, 180)
      .then(async dados => {
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

        console.log(dados);

        const atividade_principal = dados.data.atividade_principal[0].code;

        await Consulta.create({
          documento: cnpj,
          dados: dados.data,
          documento_valido: true,
          atividade_principal: atividade_principal || null
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
