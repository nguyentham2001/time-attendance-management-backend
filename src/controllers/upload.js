const multer = require('multer');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const uploadService = require('../services/upload');
const { DOMAIN_NAME } = require('../configs');

async function uploadFile(req, res, next) {
  uploadService.upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      /* eslint-disable prettier/prettier */
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          return next(new CustomError(errorCodes.LIMIT_FILE_SIZE, err.message));
        case 'LIMIT_PART_COUNT':
          return next(
            new CustomError(errorCodes.LIMIT_PART_COUNT, err.message),
          );
        case 'LIMIT_FILE_COUNT':
          return next(
            new CustomError(errorCodes.LIMIT_FILE_COUNT, err.message),
          );
        case 'LIMIT_FIELD_KEY':
          return next(new CustomError(errorCodes.LIMIT_FIELD_KEY, err.message));
        case 'LIMIT_FIELD_VALUE':
          return next(
            new CustomError(errorCodes.LIMIT_FIELD_VALUE, err.message),
          );
        case 'LIMIT_FIELD_COUNT':
          return next(
            new CustomError(errorCodes.LIMIT_FIELD_COUNT, err.message),
          );
        case 'LIMIT_UNEXPECTED_FILE':
          return next(
            new CustomError(errorCodes.LIMIT_UNEXPECTED_FILE, err.message),
          );
        default:
          return next(new CustomError(errorCodes.ERROR_UPLOAD, err.message));
        /* eslint-enable prettier/prettier */
      }
    } else if (err) {
      return next(err);
    }

    try {
      const { file } = req;
      const link = `${DOMAIN_NAME}/${file.path.slice(7)}`;
      return res.send({
        status: 1,
        result: { link, fileName: file.originalname },
      });
    } catch (error) {
      return next(error);
    }
  });
}

async function uploadUrl(req, res, next) {
  const { url } = req.body;
  try {
    const pathFile = await uploadService.uploadUrl(url);
    const link = `${DOMAIN_NAME}/${pathFile.slice(7)}`;
    return res.send({ status: 1, result: { link } });
  } catch (error) {
    return next(error);
  }
}

async function uploadBase64(req, res, next) {
  const { imageData } = req.body;

  try {
    const pathFile = await uploadService.uploadBase64(imageData);
    const link = `${DOMAIN_NAME}/${pathFile.slice(7)}`;
    return res.send({ status: 1, result: { link } });
  } catch (error) {
    return next(error);
  }
}

module.exports = { uploadFile, uploadUrl, uploadBase64 };
