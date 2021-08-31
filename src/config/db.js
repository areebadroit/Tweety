const mongoose = require('mongoose');
require('dotenv').config();

const connect = () => {
  console.log('Mongodb connected');
  return mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connect;
