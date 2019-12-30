const moment = require('moment');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'sa-east-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

/*  Funcao chamada para Enviar Log para o SQS. (Recebe um Json como argumento).
      Estrutura Json Nescessaria:
      {
      "nivel" : "info" ou "alerta" ou "erro",
      "mensagem" : "Descricao do erro, Local do erro(funcao, if), etc",
      "detalhes" : "Referente a (exemplo: numero da nota, nome do usuario, etc)",
      "email": opcional
      } */
class Log {
  public async enviar(obj) {
    const { NOME_SERVICO } = process.env;
    // Coloque aqui o nome do Sistema
    const aplicacao = { app: NOME_SERVICO };

    let array = [];
    let json = '';
    const tempo = moment().format('x');
    const timeStamp = { timeStamp: tempo };
    const verificaArray = Array.isArray(obj);
    if (verificaArray) {
      obj.map(async log => {
        array.push(Object.assign(log, timeStamp, aplicacao));
      });
    } else {
      array = Object.assign(obj, timeStamp, aplicacao);
    }
    try {
      json = JSON.stringify(array);
    } catch (error) {
      json = array.toString();
      console.error('Log com erro na escrita!');
      return;
    }

    // Gera hash aleatorio para id de log.
    const n = Math.floor(Math.random() * 9999999999);
    const k = Math.floor(Math.random() * 9999999999);
    const secret = (n * k).toString();

    const time = new Date();
    const timeString = time.toString();

    const params = {
      DelaySeconds: 0,
      MessageBody: json,
      MessageAttributes: {
        timeStampEnvio: {
          DataType: 'String',
          StringValue: timeString
        }
      },
      MessageDeduplicationId: secret,
      MessageGroupId: secret + 1,
      // Url da QUEUE
      QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/544005205437/logs.fifo'
    };

    // Envia o Log.
    await sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.error('Erro ao Enviar o Log', err);
      } else {
        console.log(`Log Enviado (${secret})`);
      }
    });
  }
}

export default new Log();
