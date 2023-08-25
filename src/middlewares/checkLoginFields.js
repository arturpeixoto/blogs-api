const checkRequiredFields = require('../utils/checkRequiredFields');

const validateLoginFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['email', 'password'];
  for (let i = 0; i < body.length; i += 1) {
    const productError = checkRequiredFields(body[i], requiredFields);
    if (productError) return res.status(400).json({ message: productError });
  }

  next();
};

module.exports = { 
  validateLoginFields, 
};