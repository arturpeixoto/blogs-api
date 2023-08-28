module.exports = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      field: 'post_id',
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      primaryKey: true,
    }
  }, {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategoryModel.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { 
      as: 'blogPosts',
      through: PostCategoryModel,
      foreignKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryModel,
      foreignKey: 'postId',
    });
  };

  return PostCategoryModel;
};
