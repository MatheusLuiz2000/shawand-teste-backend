import Exemplo from '../app/models/Exemplo';

import mysqlConfig from '../config/database';
// import mongoose from 'mongoose';

const Sequelize = require('sequelize');

const models = [Exemplo];

class Database {
  connection;

  mongoConnection;

  constructor() {
    this.mysql();
    // this.mongo();
  }

  mysql() {
    this.connection = new Sequelize(mysqlConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // mongo() {
  //   this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
  //     useNewUrlParser: true,
  //     useFindAndModify: true,
  //     useUnifiedTopology: true
  //   });
  // }
}

export default new Database();
