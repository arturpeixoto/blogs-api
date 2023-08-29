const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = authorization.split(' ')[1];
    const verification = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = verification;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;