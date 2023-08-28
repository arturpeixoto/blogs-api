module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: { arg: true, msg: 'User already registered' },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  UserModel.associate = (models) => {
    UserModel.hasMany(models.BlogPost, { foreignKey: 'userId' });
  };

  return UserModel;
};
