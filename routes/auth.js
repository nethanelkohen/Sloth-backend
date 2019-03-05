const express = require("express");
const router = express.Router();
const passport = require("passport");

const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.logIn);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    res.send(req.user);
  }
);

module.exports = router;
