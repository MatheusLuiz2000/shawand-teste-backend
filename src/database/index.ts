import SQLConfig from '../config/database';

import Consulta from '../app/models/Consulta';

const Sequelize = require('sequelize');

const models = [Consulta];

class Database {
  connection;

  constructor() {
    this.SQL();
  }

  SQL() {
    this.connection = new Sequelize(SQLConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
