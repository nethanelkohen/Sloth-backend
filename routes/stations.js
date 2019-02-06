const express = require("express");
const router = express.Router();
const StationController = require("../controllers/stations.controller");

router.post("/", StationController.create);

router.get("/:id", StationController.get);

router.put("/:id", StationController.edit);

module.exports = router;
