const { Op } = require('sequelize');
const { Category, BlogPost, PostCategory, User, sequelize } = require('../models');

const getAll = async () => {
  const posts = BlogPost.findAll({
    include: { model: User, as: 'users', through: { attributes: ['id'] } },
  });
  return { status: 'SUCCESSFUL', data: posts };
};

const createTransaction = async (title, content, categoryIds, userId) => {
  const result = sequelize.transaction(async (transaction) => {
    const published = Date.now();
    const updated = Date.now();
    const createdBlogPost = await BlogPost
      .create({ title, content, userId, published, updated }, { transaction });
    const promises = categoryIds.map(async (category) => {
      const createdPostCategory = await PostCategory
        .create({ categoryId: category, postId: createdBlogPost.id }, { transaction });
      return createdPostCategory;
    });
    await Promise.all(promises);
    return createdBlogPost;
  });
  return result;
};

const create = async (title, content, categoryIds, userId) => {
  try {
    await Category.findAll({
      where: { id: { [Op.or]: categoryIds } },
    });
    const result = await createTransaction(title, content, categoryIds, userId);
    return { status: 'CREATED', data: result };
  } catch (error) {
    if (error.parent.errno === 1452) {
      return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } }; 
    }
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Something went wrong' } };
  }
};

module.exports = {
  create,
  getAll,
};