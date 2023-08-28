const { Category } = require('../models');

const alreadyRegisteredString = 'Category already registered';

const create = async (name) => {
  try {
    const createdCategory = await Category.create({ name });
    console.log(createdCategory);
    return { status: 'CREATED', data: createdCategory.dataValues };
  } catch (error) {
    console.log(error);
      return { 
        status: 'CONFLICT', 
        data: { message: alreadyRegisteredString }, 
      }; 
  }
};

module.exports = {
  create,
};