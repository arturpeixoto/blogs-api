const express = require('express');
const { categoriesController } = require('../controllers');
const { validateFieldsExistenceCategory } = require('../middlewares/checkPostCategory');
const authMiddleware = require('../middlewares/auth');

const route = express.Router();

route.get(
  '/',
  authMiddleware,
  categoriesController.getAll,
);

route.post(
  '/',
  authMiddleware,
  validateFieldsExistenceCategory,
  categoriesController.create,
);

module.exports = route;