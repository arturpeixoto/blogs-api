const express = require('express');
const { usersController } = require('../controllers');
const { validateFieldsExistence, validateUserFields } = require('../middlewares/checkPostUser');
const authMiddleware = require('../middlewares/auth');

const route = express.Router();

route.get(
  '/',
  authMiddleware,
  usersController.getAll,
);

route.get(
  '/:id',
  authMiddleware,
  usersController.getById,
);

route.post(
  '/',
  validateFieldsExistence,
  validateUserFields,
  usersController.create,
);

module.exports = route;