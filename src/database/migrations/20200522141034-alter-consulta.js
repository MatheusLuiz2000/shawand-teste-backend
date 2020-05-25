module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('tb_consultas', 'atividade_principal', {
        type: Sequelize.STRING(255),
        allowNull: true
      })
    ]);
  }
};
