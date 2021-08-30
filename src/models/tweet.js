const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
  {
    contents: {
      type: String,
      required: true,
      maxLength: 300,
      minLength: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
