const mongoose = require('mongoose');

const connect = () => {
    console.log("Mongodb connected");
    return mongoose.connect('mongodb://localhost/Tweety',{useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = connect;