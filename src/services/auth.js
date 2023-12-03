const jwt = require('jsonwebtoken');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const userDao = require('../daos/user');

const { generateRandomString } = require('../utils/random');
const {
  generateSalt,
  encryptPassword,
  comparePassword,
} = require('../utils/security');
const generateId = require('./generateId');
const { sendMail } = require('./mail');

const {
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME,
  FRONTEND_PAGE_DOMAIN,
} = require('../configs');

const generateAccessToken = async (userId) => {
  const accessToken = await jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
};

const login = async (email, password) => {
  const user = await userDao.findUser(
    { email },
    { hideSensitiveFields: false },
  );
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);

  const userId = user._id;
  const accessToken = await generateAccessToken(userId);
  return accessToken;
};

const verifyAccessToken = async (accessToken) => {
  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
  const { userId } = data;

  const user = await userDao.findUser(userId);

  return user;
};

const register = async ({ isAdmin = false, ...userData }) => {
  const { email, name } = userData;
  let user = await userDao.findUser({ email });
  if (user) throw new CustomError(errorCodes.USER_EXISTS);

  let { password } = userData;
  const salt = generateSalt();
  password = password || generateRandomString(16);

  let employeeId;
  if (!isAdmin) {
    employeeId = await generateId({ alias: 'NV' });

    sendMail({
      to: email,
      subject: 'Tài khoản đăng nhập hệ thống TIMEKEEPING',
      html:
        `Chào <strong>${name}</strong>!<br /><br />` +
        `Tài khoản của bạn đã được tạo thành công trên hệ thống TIMEKEEPING. Để sử dụng dịch vụ, vui lòng truy cập vào địa chỉ ${FRONTEND_PAGE_DOMAIN} và đăng nhập với email <strong>${email}</strong> - mật khẩu <strong>${password}</strong>.<br /><br />` +
        'Trân trọng!',
    });
  }

  user = await userDao.createUser({
    employeeId,
    ...userData,
    salt,
    password: await encryptPassword(password, salt),
    isAdmin,
  });
  return user;
};

module.exports = { login, register, verifyAccessToken };
