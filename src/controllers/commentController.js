const Comment = require('../models/comment');
const Tweet = require('../models/tweet');

const {  newCommentMailer } = require('../mailers/comments_mailer');

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
    newCommentMailer(tweet);
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
