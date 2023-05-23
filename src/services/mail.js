const nodemailer = require('nodemailer');

const { EMAIL_USERNAME, EMAIL_PASSWORD } = require('../configs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

const sendMail = async ({
  from = '',
  to,
  subject,
  text,
  html,
  attachments,
}) => {
  // html is more priority than text
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
    attachments,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

module.exports = { sendMail };
