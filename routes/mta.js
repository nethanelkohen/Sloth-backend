const express = require("express");
const router = express.Router();

var Mta = require("mta-gtfs");
var mta = new Mta({
  key: "3b7fca573e76016e063aa5805ad6519c", // only needed for mta.schedule() method
  feed_id: 16 // optional, default = 1
});

router.get("/", (req, res, next) => {
  mta
    .stop(["R01", "R03", "R04", "R05", "R06", "R08", "R09"])
    // .stop()
    .then(function(result) {
      console.log(result);
    })
    .catch(function(err) {
      console.log(err);
    });
  res.send("mta station");
});

router.get("/schedule", (req, res, next) => {
  var utcSeconds = 1551765617;
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);

  let nycTime = new Date(d).toLocaleString("en-US", {
    timeZone: "America/New_York"
  });

  console.log("nyctime", nycTime);

  mta
    .schedule(["R01", "R03", "R04", "R05", "R06", "R08", "R09"])
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

module.exports = router;

router.get("/status", (req, res, next) => {
  mta
    .status("subway")
    .then(result => {
      console.log(result);

      res.send(result);
    })
    .catch(err => console.log(err));
});

module.exports = router;
