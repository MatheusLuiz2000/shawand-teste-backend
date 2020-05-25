module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_consultas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      documento: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      dados: {
        type: Sequelize.JSON,
        allowNull: true
      },
      documento_valido: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false
      },
      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: false
      },
      desativado_em: {
        type: Sequelize.DATE
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tb_consultas');
  }
};
