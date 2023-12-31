module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};
