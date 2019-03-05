const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../models/");

const logIn = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(200).send({
        message: err
      });
    }

    if (info !== undefined) {
      return res.status(200).send({
        message: info.message
      });
    } else {
      req.logIn(user, err => {
        User.findOne({ where: { username: user.username } })
          .then(user => {
            const token = jwt.sign(user.dataValues, process.env.JWT_SECRET);
            res.status(200).send({
              auth: true,
              user: user,
              token: token,
              message: "Logged in!"
            });
          })
          .catch(err => console.log(err));
      });
    }
  })(req, res, next);
};

module.exports.logIn = logIn;
