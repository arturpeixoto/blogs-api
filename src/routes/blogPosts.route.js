const express = require('express');
const { blogPostsController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');
const { 
  validateFieldsExistenceCreatePosts,
  validateFieldsExistenceUpdatePosts,
} = require('../middlewares/checkRequiredPostFields');

const route = express.Router();

route.get(
  '/:id',
  authMiddleware,
  blogPostsController.getById,
);

route.put(
  '/:id',
  authMiddleware,
  validateFieldsExistenceUpdatePosts,
  blogPostsController.update,
);

route.delete(
  '/:id',
  authMiddleware,
  blogPostsController.eliminate,
);

route.get(
  '/',
  authMiddleware,
  blogPostsController.getAll,
);

route.post(
  '/',
  authMiddleware,
  validateFieldsExistenceCreatePosts,
  blogPostsController.create,
);

module.exports = route;