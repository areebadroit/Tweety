//Router main file
const express = require("express");

const homeController = require('../controllers/homeController');
const userRouter = require('./users');
const tweetRouter = require('./tweets');
const commentRouter = require('./comments');

const router = express.Router();
console.log("router UP!");

router.get('/', homeController.root);
router.use('/users', userRouter);
router.use('/tweets', tweetRouter);
router.use('/comments', commentRouter);

module.exports = router;
