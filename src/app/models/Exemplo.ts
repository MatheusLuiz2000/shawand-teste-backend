import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize,
        tableName: 'tb_usuario',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }
}

export default Usuario;
