const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const { setFlash } = require("./src/middleware/flash");

const router = require("./src/routes/index");
const connect = require("./src/config/db");
const passportlocal = require("./src/middleware/passport-local");

const app = express();
app.use(cors());
const chatEngine = require("http").Server(app);
const { socket } = require("./src/config/sockets");
const chatSockets = socket(chatEngine);

chatEngine.listen(3001, () => {
  console.log("Socket listening to 3001");
});
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(__dirname + "/src/assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayouts);
app.set("layout", __dirname + "/src/views/layouts/layout");
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(
  session({
    name: "twitter",
    secret: "sanketunacademy",
    resave: false,
    cookie: {
      maxAge: 6000000,
    },
    store: new mongoStore(
      {
        mongoUrl: "mongodb://localhost/twitter_dev",
        autoRemove: "disable",
      },
      function (err) {
        if (err) console.error(err);
        console.log("connect-mongo setup done");
      }
    ),
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(setFlash);

app.use("/", router);

app.listen(3000, async () => {
  await connect();
  console.log("Server up and running at port 3000");
});
