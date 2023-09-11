const absenceService = require('../services/absence');

const createAbsence = async (req, res) => {
  const absence = await absenceService.createAbsence(req.body);

  return res.send({ status: 1, result: absence });
};

const updateAbsence = async (req, res) => {
  const { id } = req.params;
  const absence = await absenceService.updateAbsence(id, req.body);

  return res.send({ status: 1, result: absence });
};

const getAbsence = async (req, res) => {
  const { id } = req.params;
  const absence = await absenceService.getAbsence(id);

  return res.send({ status: 1, result: absence });
};

const deleteAbsence = async (req, res) => {
  const { id } = req.params;
  const absence = await absenceService.deleteAbsence(id);

  return res.send({ status: 1, result: absence });
};

const getListAbsences = async (req, res) => {
  const result = await absenceService.getListAbsences({
    ...req.query,
  });

  return res.send({ status: 1, result });
};

module.exports = {
  createAbsence,
  updateAbsence,
  getAbsence,
  deleteAbsence,
  getListAbsences,
};
