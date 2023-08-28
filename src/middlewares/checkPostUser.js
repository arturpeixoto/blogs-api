const checkRequiredFields = require('../utils/checkRequiredFields');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateFieldsExistence = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['email', 'password', 'displayName', 'image'];
  const userCreateError = checkRequiredFields(body, requiredFields);
  if (userCreateError) return res.status(400).json({ message: userCreateError });
  const { email, password, displayName } = body;
  if (!email || !password || !displayName) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateUserFields = (req, res, next) => {
  const { body } = req;
  const { email, password, displayName } = body;
  if (displayName.length < 8) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (emailRegex.test(email) === false) {
    return res.status(400)
      .json({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

module.exports = { 
  validateUserFields, 
  validateFieldsExistence,
};