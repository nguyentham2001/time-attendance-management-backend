const multer = require('multer');
const path = require('path');
const fs = require('fs');
const request = require('request');
const FileType = require('file-type');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { mkDirByPathSync } = require('../utils/file');
const { generateRandomString } = require('../utils/random');
const { splitDate } = require('../utils/date');
const { FILE_SIZE_LIMITED } = require('../configs');
const { UPLOAD } = require('../constants');

const { DESTINATION, AUDIO_FOLDER, IMAGES_FOLDER, VIDEO_FOLDER, OTHER_FOLDER } =
  UPLOAD;

const filetypes =
  /jpeg|jpg|png|gif|mp3|wma|wav|audio\/vnd.wave|acc|m4a|flac|mp4|mpg|mpeg|mov|wmv|flv|f4v|plain|pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.ms-powerpoint|vnd.openxmlformats-officedocument.presentationml.presentation|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet|application\/zip|application\/x-xz|application\/x-7z-compressed|application\/x-rar-compressed|application\/json/;
const fileExts =
  /jpeg|jpg|png|gif|mp3|wma|wav|acc|m4a|flac|mp4|mpg|mpeg|mov|wmv|flv|f4v|txt|pdf|doc|docx|ppt|pptx|xls|xlsx|zip|7z|rar|json/;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destination;

    const customDestination = req.body.destination;
    if (customDestination) {
      destination = `${DESTINATION}/${customDestination}`;
    } else {
      const today = new Date();
      const { year, month, day } = splitDate(today);
      destination = specifyDestination(file.mimetype, year, month, day);
    }
    mkDirByPathSync(destination);

    return cb(null, destination);
  },
  filename: (req, file, cb) => {
    const { name } = req.body;
    const extension = path.extname(file.originalname);
    const filename = name ? `${name}${extension}` : file.originalname;
    return cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const mimetype = filetypes.test(file.mimetype);
    const extname = fileExts.test(
      path.extname(file.originalname).toLowerCase(),
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(
      new CustomError(
        errorCodes.INVALID_FILE_TYPE,
        `File upload only support the following filetypes: ${filetypes}`,
      ),
    );
  },
  limits: {
    fileSize: FILE_SIZE_LIMITED,
  },
});

async function uploadUrl(url) {
  const today = new Date();
  const { year, month, day } = splitDate(today);

  return new Promise((resolve, reject) => {
    request({ url, encoding: null }, async (error, response, body) => {
      if (!error && response.statusCode === 200) {
        try {
          const { ext, mime } = await FileType.fromBuffer(body);
          if (!filetypes.test(mime) || !fileExts.test(ext)) {
            throw new CustomError(
              errorCodes.INVALID_FILE_TYPE,
              `File upload only support the following filetypes: ${filetypes}`,
            );
          }

          const destination = specifyDestination(mime, year, month, day);
          mkDirByPathSync(destination);

          const pathFile = `${destination}/${generateRandomString(16)}.${ext}`;

          fs.writeFileSync(pathFile, body, {
            encoding: null,
          });
          resolve(pathFile);
        } catch (err) {
          reject(err);
        }
      } else {
        reject(error);
      }
    });
  });
}

async function uploadBase64(imageData) {
  const [mimeType, base64Data] = imageData.split(',');
  const imageExtension = mimeType.substring(
    'data:image/'.length,
    mimeType.indexOf(';base64'),
  );

  if (!filetypes.test(imageExtension))
    throw new CustomError(
      errorCodes.INVALID_FILE_TYPE,
      `File upload only support the following filetypes: ${filetypes}`,
    );

  const today = new Date();
  const { year, month, day } = splitDate(today);

  const destination = specifyDestination(mimeType, year, month, day);
  mkDirByPathSync(destination);

  return new Promise((resolve, reject) => {
    const filePath = `${destination}/${generateRandomString(
      16,
    )}.${imageExtension}`;

    fs.writeFile(filePath, Buffer.from(base64Data, 'base64'), (err) => {
      if (err) {
        reject(err);
      }

      resolve(filePath);
    });
  });
}

function specifyDestination(mimetype, year, month, day) {
  const SUFFIX_PATH = `${year}/${month}/${day}/${generateRandomString(16)}`;
  let destination = `${DESTINATION}/${OTHER_FOLDER}/${SUFFIX_PATH}`;

  if (/image/.test(mimetype))
    destination = `${DESTINATION}/${IMAGES_FOLDER}/${SUFFIX_PATH}`;

  if (/audio/.test(mimetype))
    destination = `${DESTINATION}/${AUDIO_FOLDER}/${SUFFIX_PATH}`;

  if (/video/.test(mimetype))
    destination = `${DESTINATION}/${VIDEO_FOLDER}/${SUFFIX_PATH}`;

  return destination;
}

module.exports = { upload, uploadUrl, uploadBase64 };
