module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('tb_consultas', 'documento', {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      })
    ]);
  }
};
