const express = require("express");
const router = express.Router();

var Mta = require("mta-gtfs");
var mta = new Mta({
  key: process.env.MTA_KEY, // only needed for mta.schedule() method
  feed_id: 16 // optional, default = 1
});

router.get("/", (req, res, next) => {
  mta
    .stop(["R01", "R03", "R04", "R05", "R06", "R08", "R09"])
    // .stop()
    .then(function(result) {
      res.send(result);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.get("/schedule", (req, res, next) => {
  mta
    .schedule(["R01", "R03", "R04", "R05", "R06", "R08", "R09"])
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

module.exports = router;

router.get("/status", (req, res, next) => {
  console.log("IN MTA", req, res);

  mta
    .status("subway")
    .then(result => res.json({ result }))
    .catch(err => console.log(err));
});

module.exports = router;
