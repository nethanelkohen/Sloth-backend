const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../models/");

const logIn = async (req, res, next) => {
  passport.authenticate("local", { session: false }, async (err, user) => {
    findUserInfo = () => {
      return User.findOne({ where: { id: user } }).then(res => res);
    };
    let userInfo = await findUserInfo();

    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
        err: err
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response

      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token, userInfo });
    });
  })(req, res);
};

module.exports.logIn = logIn;
