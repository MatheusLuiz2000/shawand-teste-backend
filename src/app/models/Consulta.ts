import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Consulta extends Model {
  static init(sequelize) {
    super.init(
      {
        documento: Sequelize.STRING,
        dados: Sequelize.JSON,
        atividade_principal: Sequelize.STRING(255),
        documento_valido: Sequelize.BOOLEAN,
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'tb_consultas',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        underscored: false
      }
    );

    return this;
  }
}

export default Consulta;
