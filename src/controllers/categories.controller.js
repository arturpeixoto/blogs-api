const { categoriesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (req, res) => {
  const { status, data } = await categoriesService.getAll();
  res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { status, data } = await categoriesService.create(name);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  create,
};