const mongoose = require('mongoose');

const connect = () => {
  console.log('Mongodb connected');
  return mongoose.connect('mongodb://localhost/Tweety', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connect;
