const absenceRequestService = require('../services/absenceRequest');

const createAbsenceRequest = async (req, res) => {
  const { _id: userId } = req.user;
  const absenceRequest = await absenceRequestService.createAbsenceRequest({
    ...req.body,
    userId,
  });

  return res.send({ status: 1, result: absenceRequest });
};

const updateAbsenceRequest = async (req, res) => {
  const { id } = req.params;
  const absenceRequest = await absenceRequestService.updateAbsenceRequest(
    id,
    req.body,
  );

  return res.send({ status: 1, result: absenceRequest });
};

const getAbsenceRequest = async (req, res) => {
  const { id } = req.params;
  const absenceRequest = await absenceRequestService.getAbsenceRequest(id);

  return res.send({ status: 1, result: absenceRequest });
};

const deleteAbsenceRequest = async (req, res) => {
  const { id } = req.params;
  const absenceRequest = await absenceRequestService.deleteAbsenceRequest(id);

  return res.send({ status: 1, result: absenceRequest });
};

const getListAbsenceRequests = async (req, res) => {
  const result = await absenceRequestService.getListAbsenceRequests({
    ...req.query,
  });

  return res.send({ status: 1, result });
};

module.exports = {
  createAbsenceRequest,
  updateAbsenceRequest,
  getAbsenceRequest,
  deleteAbsenceRequest,
  getListAbsenceRequests,
};
