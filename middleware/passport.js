const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

const { User } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, cb) {
      //Assume there is a DB module pproviding a global User
      return User.findOne({ where: { username, password } })
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect username or password."
            });
          }

          return cb(null, user.id, {
            message: "Logged In Successfully"
          });
        })
        .catch(err => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload, cb) {
      //find the user in db if needed
      return User.findByPk(jwtPayload)
        .then(user => cb(null, user))
        .catch(err => cb(err));
    }
  )
);
