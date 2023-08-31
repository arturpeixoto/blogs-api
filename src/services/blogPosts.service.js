const { Op } = require('sequelize');
const { Category, BlogPost, User } = require('../models');
const { checkPost, checkUser, createTransaction } = require('../utils/blogPostsFunctions');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }] });
  return { status: 'SUCCESSFUL', data: posts };
};
const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }] });
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESSFUL', data: post };
};
const create = async (title, content, categoryIds, userId) => {
  try {
    await Category.findAll({ where: { id: { [Op.or]: categoryIds } } });
    const result = await createTransaction(title, content, categoryIds, userId);
    return { status: 'CREATED', data: result };
  } catch (error) {
    if (error.parent.errno === 1452) {
      return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } }; 
    } 
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Something went wrong' } }; 
  }
};
const update = async (postId, title, content, userId) => {
  const post = await checkPost(postId);
  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  const isUserAllowed = await checkUser(userId, postId);
  if (!isUserAllowed) { return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } }; }
  post.title = title;
  post.content = content;
  post.updated = Date.now();
  await post.save();
  return getById(postId);
};
const eliminate = async (postId, userId) => {
  const post = await checkPost(postId);
  if (!post) { return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } }; }
    const isUserAllowed = await checkUser(userId, postId);
  if (!isUserAllowed) { return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } }; }
  await BlogPost.destroy({ where: { id: postId } });
  return { status: 'NO_CONTENT' };
};
const getBySearchTerm = async (searchQuery) => {
  const posts = await BlogPost.findAll({ where: { [Op.or]: [
        { title: { [Op.like]: `%${searchQuery}%` } },
        { content: { [Op.like]: `%${searchQuery}%` } }] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }] });
  return { status: 'SUCCESSFUL', data: posts };
};
module.exports = { create, getAll, getById, update, eliminate, getBySearchTerm };