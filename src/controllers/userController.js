const User = require('../models/user');
const multer  = require('multer')
const upload = multer({ dest: './src/uploads/' });
const {getFile, uploadFile} = require('../config/s3');

const {unlinkSync} = require('fs');

const create = async function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  await User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log(err);
          return;
        }
          res.redirect('/');
      });
    } else {
        res.redirect('/users/signup');
    }
  });
};
const signUp = function (req, res) {
  return res.render('users/user_sign_up', { title: 'Twitter' });
};

const signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return res.render('users/user_sign_in', { title: 'Twitter' });
};

const createSession = function (req, res) {
  req.flash('success', 'Signed In Successfully');
  //console.log("flash", req.flash);
//   console.log(req);
  return res.redirect('/');
};

const profile = async function (req, res) {
  await User.findById(req.params.id, function (err, user) {
    if (err || !user) {
      console.log(err);
      return res.redirect('back');
      } 
      if(!user.avatar) {
        user.avatar = 'f17a6fa085c039c41d3e595aaa6d8946';
    }
    return res.render('users/user_profile', {
      title: 'User Profile',
      profile_user: user,
    });
  });
};
const update = async function (req, res) {
  if (req.user.id == req.params.id) {
    await User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      if (err || !user) {
        console.log(err);
        return res.redirect('back');
      }
      return res.redirect('back');
    });
  } else {
    return res.status(401).isAuthenticated('Unauthorised');
  }
};
const destroySession = function (req, res) {
  req.logout();
  req.flash('info', 'Signed Out Successfully');
  //console.log("flash", req.flash);
  return res.redirect('/');
};

const updateAvatar = async function(req, res) {
    const file = req.file;
    try {
        const result = await uploadFile(file);
        unlinkSync(file.path);
        const currentUser = req.user.id;
        //console.log("currentuser", currentUser);
        await User.findByIdAndUpdate(currentUser, {avatar: result.key}, function(err, user) {
            if(err) {
                console.log(err);
                return res.redirect('/');
            }
            return res.redirect('back');
        })
    } catch(err) {
        console.log(err);
        return res.redirect('/');
    }
}

const getAvatar = function(req, res) {
    const imgStream = getFile(req.params.key);
    imgStream.pipe(res);
}

module.exports = {
  create,
  signUp,
  signIn,
  createSession,
  profile,
  update,
    destroySession,
    updateAvatar,
  getAvatar
};
