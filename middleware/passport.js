const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

const { User } = require("../models");

passport.use(
  new LocalStrategy((username, password, done) => {
    try {
      User.findOne({
        where: {
          username: username
        }
      }).then(user => {
        if (user === null) {
          return done(null, false, { message: "Username not found" });
        } else {
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              return done(null, false, { message: "Wrong password" });
            }

            return done(null, user);
          });
        }
      });
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload, cb) {
      return User.findByPk(jwtPayload.id)
        .then(user => cb(null, user))
        .catch(err => cb(err));
    }
  )
);
