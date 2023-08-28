const { User } = require('../models');

const alreadyRegisteredString = 'User already registered';

const getAll = async () => {
  const data = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { status: 'SUCCESSFUL', data };
};

const getByEmail = async (email, password) => {
  const data = await User.findOne({ where: { email } });
  if (data === null || password !== data.dataValues.password) {
    return {
      data: { message: 'Invalid fields' },
      status: 'BAD_REQUEST',
    };
  }
  return { status: 'SUCCESSFUL', data: data.dataValues };
};

const create = async (user) => {
  try {
    const createdUser = await User.create(user);
    return { status: 'CREATED', data: createdUser.dataValues };
  } catch (error) {
      return { 
        status: 'CONFLICT', 
        data: { message: alreadyRegisteredString }, 
      }; 
  }
};

module.exports = {
  create,
  getByEmail,
  getAll,
};