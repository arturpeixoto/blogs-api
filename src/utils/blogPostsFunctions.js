const { BlogPost, PostCategory, sequelize } = require('../models');

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

const checkUser = async (userId, postId) => {
  const retrievedPost = await BlogPost.findOne({ where: { id: postId } });
  return retrievedPost.userId === userId;
};

const checkPost = async (postId) => BlogPost.findOne({ where: { id: postId } });

module.exports = {
  checkUser,
  checkPost,
  createTransaction,
};