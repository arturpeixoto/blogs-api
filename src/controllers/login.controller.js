const jwt = require('jsonwebtoken');
const { usersService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await usersService.getByEmail(email, password);
  if (status === 'SUCCESSFUL') {
    const token = jwt.sign({
      name: data.name,
      id: data.id,
    }, process.env.JWT_SECRET, {
      algorithm: 'HS256',
    });
    console.log(token);
    return res.status(mapStatusHTTP(status)).json({ token });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  login,
};