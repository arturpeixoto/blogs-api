const jwt = require('jsonwebtoken');
const { usersService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (req, res) => {
  const { status, data } = await usersService.getAll();
  res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await usersService.getById(id);
  res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req, res) => {
  try {
    const user = req.body;
    const { status, data } = await usersService.create(user);
    if (status === 'CREATED') {
      const token = jwt.sign({
        name: data.name,
        id: data.id,
      }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
      });
      return res.status(mapStatusHTTP(status)).json({ token });
    }
    res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminate = async (req, res) => {
  const { user } = req.body;
  const { status } = await usersService.eliminate(user.id);
  res.status(mapStatusHTTP(status)).end();
};

module.exports = {
  create,
  getAll,
  getById,
  eliminate,
};