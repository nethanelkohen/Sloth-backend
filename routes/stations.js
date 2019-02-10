const express = require("express");
const router = express.Router();
const StationController = require("../controllers/stations.controller");

router.post("/", StationController.create);

router.get("/all", StationController.getAll);

router.get("/:station", StationController.get);

router.put("/:station", StationController.edit);

module.exports = router;
