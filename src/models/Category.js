module.exports = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName: 'categories',
    underscored: true,
  });

  return CategoryModel;
}