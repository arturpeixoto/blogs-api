const { User } = require('../models');

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
  const createdUser = User.create(user);
  return createdUser;
};

module.exports = {
  create,
  getByEmail,
};