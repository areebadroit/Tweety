const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const User = require("../models/user");
console.log("passport here");
/*
By default, LocalStrategy expects to find credentials in parameters named username and password. If your site prefers to name these fields differently, 
options are available to change the defaults.
{
      usernameField: "email",
      passwordField: 'password'
    }
 */
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: 'password'
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.password != password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user");
    }
    done(err, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/signin");
};

passport.setAuthenticatedUser = function (req, res, next) {
  //console.log(req);
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;

