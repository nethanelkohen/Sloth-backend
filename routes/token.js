const express = require("express");
const router = express.Router();

const { saveToken, handlePushTokens } = require("../middleware/notification");

router.post("/", (req, res) => {
  saveToken(req.body.token.value);
  console.log(`Received push token, ${req.body.token.value}`);
  res.send(`Received push token, ${req.body.token.value}`);
});

router.post("/message", (req, res) => {
  handlePushTokens(req.body.message);
  console.log(`Received message, ${req.body.message}`);
  res.send(`Received message, ${req.body.message}`);
});

module.exports = router;
