import mongoose from 'mongoose';
import Exemplo from '../app/models/Exemplo';
import SQLConfig from '../config/database';

const Sequelize = require('sequelize');

const models = [Exemplo];

class Database {
  connection;

  NOSQLConnection;

  constructor() {
    // this.SQL();
    this.NOSQL();
  }

  SQL() {
    this.connection = new Sequelize(SQLConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  NOSQL() {
    this.NOSQLConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
  }
}

export default new Database();
