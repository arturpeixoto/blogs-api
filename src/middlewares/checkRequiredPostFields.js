const checkRequiredFields = require('../utils/checkRequiredFields');

const validateFieldsExistenceCreatePosts = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['title', 'content', 'categoryIds'];
  const blogPostError = checkRequiredFields(body, requiredFields);
  if (blogPostError) return res.status(400).json({ message: blogPostError });
  const { content, title, categoryIds } = body;
  if (!content || !title || !Array.isArray(categoryIds)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateFieldsExistenceUpdatePosts = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['title', 'content'];
  const blogPostError = checkRequiredFields(body, requiredFields);
  if (blogPostError) return res.status(400).json({ message: blogPostError });
  const { content, title } = body;
  if (!content || !title) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = { 
  validateFieldsExistenceCreatePosts, 
  validateFieldsExistenceUpdatePosts,
};