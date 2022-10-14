const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (error, user) => {
      if (error) return done(error);
      if (!user)
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      if (!isValidPassword(user, password))
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, (error, user) => {
        if (error)
          return done(error, user, {
            message: "Error trying to register user",
          });
        if (user) return done(null, false, { message: "User already exists" });
        const newUser = { username, password: createHash(password) };
        User.create(newUser, (error, userWithId) => {
          if (error)
            return done(error, user, { message: "Error creating user" });
          return done(null, userWithId, { message: "User registered" });
        });
      });
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, done));

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect("/login");
};

module.exports = checkAuthentication;
