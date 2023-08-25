const express = require('express');
const { usersController } = require('../controllers');

const route = express.Router();

route.post('/', usersController.create);

module.exports = route;