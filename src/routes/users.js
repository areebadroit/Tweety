const express = require("express");
const passport = require("passport");
require("../middleware/passport-local");
const {
  create,
  signUp,
  signIn,
  createSession,
    profile,
    update,
  destroySession
} = require("../controllers/userController");

const router = express.Router();

router.get("/signup", signUp);
router.post("/create", create);//new user signup
router.post("/update/:id", update);
router.get("/signin", signIn);
router.get("/profile/:id", passport.checkAuthentication, profile);
router.get("/signout", destroySession);
router.post(//signin
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/signin",
  }),
  createSession
);
module.exports = router;
