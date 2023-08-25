const express = require('express');
const { validateLoginFields } = require('../middlewares/checkLoginFields');
const { loginController } = require('../controllers');

const route = express.Router();

route.post('/', validateLoginFields, loginController.login);

module.exports = route;