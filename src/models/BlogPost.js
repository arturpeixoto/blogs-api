module.exports = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'blog_posts',
  });

  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return BlogPostModel;
};
