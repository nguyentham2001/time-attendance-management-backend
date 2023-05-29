const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const uploadController = require('../controllers/upload');

/* eslint-disable prettier/prettier */
router.post('/uploads/file', asyncMiddleware(uploadController.uploadFile));
router.post('/uploads/url', asyncMiddleware(uploadController.uploadUrl));
router.post('/uploads/base64', asyncMiddleware(uploadController.uploadBase64));
/* eslint-enable prettier/prettier */

module.exports = router;
