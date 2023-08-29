const express = require('express');
const { blogPostsController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');
const { validateFieldsExistencePosts } = require('../middlewares/checkRequiredPostFields');

const route = express.Router();

route.get(
  '/',
  authMiddleware,
  blogPostsController.getAll,
);

route.post(
  '/',
  authMiddleware,
  validateFieldsExistencePosts,
  blogPostsController.create,
);

module.exports = route;