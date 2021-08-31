const Comment = require('../models/comment');
const Tweet = require('../models/tweet');
const commentEmailWorker = require('../workers/commentMailerWorker');
const {  newCommentMailer } = require('../mailers/comments_mailer');
const queue = require('../config/kue');

const create = async function (req, res) {
  try {
    const tweet = await Tweet.findById(req.body.tweet).populate('user');
    const comment = await Comment.create({
      content: req.body.content,
      tweet: req.body.tweet,
      user: req.user._id,
    });
    tweet.comments.push(comment);
    tweet.save();
    let job = queue.create('email', tweet).save(function (err) {
      if (err) {
        console.log('Error');
      return;
      }
      console.log('Passed',job.id);
      return;
    })
    //newCommentMailer(tweet);
    return res.redirect('/');
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
};

const destroy = async function (req, res) {
  try {
    await Comment.findById(req.params.id, function (err, comment) {
      if (!comment) {
        return res.redirect('back');
      }
      if ((comment.user == req.user.id)) {
        let tweetId = comment.tweet;
        comment.remove();
        Tweet.findByIdAndUpdate(
          tweetId,
            { $pull: { comments:req.params.id} },
          function (err, tweet) {
            return res.redirect('back');
          }
        );
      } else {
        res.return('back');
      }
    });
  } catch (err) {
    console.log(err);
    res.return('back');
  }
};
module.exports = { create, destroy };
