const { usersService } = require('../services');

const create = async (req, res) => {
  try {
    const user = req.body;
    const result = await usersService.create(user);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
};