const Tweet = require('../models/tweet');

const create = async function (req, res) {
    try {
        await Tweet.create({
            contents: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (err) {
        console.log("Error in creating a tweet");
        console.log(err);
        return;
    }
}

const destroy = async function (req, res) {
    try {
        const tweet = await Tweet.findById(req.params.id)
        if (tweet.user == req.user.id) {
            tweet.remove();
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return;
    }
}

module.exports = { create, destroy };