const mailer = require('../config/mailer');

const newCommentMailer = function(tweet) {
  mailer.transporter.sendMail({
    from: '"Twitter 😎" <comments@twitter.com>', // sender address
    to: tweet.user.email, // list of receivers
    subject: 'New Comment on your Tweet', // Subject line
    html: '<b>New Comment on your Tweet</b>', // html body
  }, (err, info) => {
      if (err) {
          console.log(err);
          return;
      }
      console.log('Email Sent');
      return;
  });
};

module.exports = {newCommentMailer};
