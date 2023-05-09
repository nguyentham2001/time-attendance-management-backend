const positionService = require('../services/position');

const createPosition = async (req, res) => {
  const position = await positionService.createPosition(req.body);

  return res.send({ status: 1, result: position });
};

const updatePosition = async (req, res) => {
  const { id } = req.params;
  const position = await positionService.updatePosition(id, req.body);

  return res.send({ status: 1, result: position });
};

const getPosition = async (req, res) => {
  const { id } = req.params;
  const position = await positionService.getPosition(id);

  return res.send({ status: 1, result: position });
};

const deletePosition = async (req, res) => {
  const { id } = req.params;
  const position = await positionService.deletePosition(id);

  return res.send({ status: 1, result: position });
};

const getListPositions = async (req, res) => {
  const result = await positionService.getListPositions({
    ...req.query,
  });

  return res.send({ status: 1, result });
};

module.exports = {
  createPosition,
  updatePosition,
  getPosition,
  deletePosition,
  getListPositions,
};
