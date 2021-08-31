const express = require('express');
const passport = require('passport');
require('../middleware/passport-local');
const multer  = require('multer')
const upload = multer({ dest: './src/uploads/' })
const {
  create,
  signUp,
  signIn,
  createSession,
  profile,
  update,
  destroySession,
    updateAvatar,
  getAvatar
} = require('../controllers/userController');

const router = express.Router();

router.get('/signup', signUp);
router.post('/create', create); //new user signup
router.post('/update/:id', update);
router.get('/signin', signIn);
router.get('/profile/:id', passport.checkAuthentication, profile);
router.get('/signout', destroySession);
router.get('/images/:key', getAvatar);
router.post(
  '/updateAvatar',
  passport.checkAuthentication,
  upload.single('avatar'),
  updateAvatar
);
router.post(
  //signin
  '/create-session',
  passport.authenticate('local', {
    failureRedirect: '/users/signin',
  }),
  createSession
);
module.exports = router;
