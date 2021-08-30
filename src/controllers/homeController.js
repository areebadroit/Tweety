const Tweet = require('../models/tweet');

module.exports.root = async function (req, res) {
  try {
    const fetchedTweets = await Tweet.find({})
      .populate('user')
      .sort({ "createdAt": -1 });
      return res.render("home", {
        title: "Twitter",
        tweets: fetchedTweets,
      });
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
};
