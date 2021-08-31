const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs'); //to send html content in emaill
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

let mailTemplate = function (data, path) {
  var mailerTemplate;
  ejs.renderFile(
    path.join(__dirname + '../views/mailers', path),
    data,
    function (err, template) {
      if (err) {
        console.log(err);
        return;
      }
      mailerTemplate = template;
    }
  );
  return mailerTemplate;
};

module.exports = { transporter,mailTemplate };