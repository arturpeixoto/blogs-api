const jwt = require('jsonwebtoken');
const { blogPostsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (req, res) => {
  const { status, data } = await blogPostsService.getAll();
  res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await blogPostsService.getById(id);
  res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const { status, data } = await blogPostsService.create(title, content, categoryIds, userId);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
};