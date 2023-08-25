const checkRequiredFields = require('../utils/checkRequiredFields');

const validateLoginFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['email', 'password'];
  const loginError = checkRequiredFields(body, requiredFields);
  if (loginError) return res.status(400).json({ message: loginError });
  const { email, password } = body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = { 
  validateLoginFields, 
};