const { Category } = require('../models');

const alreadyRegisteredString = 'Category already registered';

const getAll = async () => {
  const data = await Category.findAll({ order: [['id', 'ASC']] });
  return { status: 'SUCCESSFUL', data };
};

const create = async (name) => {
  try {
    const createdCategory = await Category.create({ name });
    return { status: 'CREATED', data: createdCategory.dataValues };
  } catch (error) {
      return { 
        status: 'CONFLICT', 
        data: { message: alreadyRegisteredString }, 
      }; 
  }
};

module.exports = {
  create,
  getAll,
};