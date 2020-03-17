export default {
  region: 'sa-east-1',
  accessKeyId: 'AKIAX5KJ4VW6WUNTQA6S',
  secretAccessKey: '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',
  nomeApi: 'adiante_cliente',
  filaDev: 'https://sqs.sa-east-1.amazonaws.com/544005205437/logs.fifo',
  filaMaster: 'https://sqs.sa-east-1.amazonaws.com/544005205437/logs-master.fifo',
  filaDevPrioridade:
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs-erro.fifo',
  filaMasterPrioridade: 
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs-master-prioridade.fifo',
  env: process.env.NODE_ENV
};