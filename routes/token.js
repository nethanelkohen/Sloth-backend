const express = require("express");
const router = express.Router();
const { User } = require("../models");
const {
  handlePushTokens,
  handlePushTokensMorning
} = require("../middleware/notification");

router.post("/:id", (req, res) => {
  const { token } = req.body.token;
  const { id } = req.params;

  User.findOne({ where: { id } }).then(user => {
    user.update({ expo_token: token });
  });

  return res.send(`Updated user's token`);
});

router.get("/morning", (req, res) => handlePushTokensMorning());

router.post("/message", (req, res) => {
  handlePushTokens(req.body.message);
  console.log(`Received message, ${req.body.message}`);
  res.send(`Received message, ${req.body.message}`);
});

module.exports = router;
