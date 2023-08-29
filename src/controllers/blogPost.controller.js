const jwt = require('jsonwebtoken');
const { blogPostsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

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
};