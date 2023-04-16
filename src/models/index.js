const mongoose = require('mongoose');
const {
  MONGO_URI,
  ADMIN_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = require('../configs');
const authService = require('../services/auth');
const userDao = require('../daos/user');
const { logger } = require('../utils/logger');

mongoose.connect(MONGO_URI, {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error.', MONGO_URI);
  logger.error(err);
  process.exit();
});

mongoose.connection.once('open', () => {
  logger.info(`Connected to MongoDB: ${MONGO_URI}`);
});

(async () => {
  const admin = await userDao.findUser({ isAdmin: true });
  if (!admin) {
    logger.info('create admin');

    await authService.register({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      isAdmin: true,
    });
  }
})();
