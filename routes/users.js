const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

router.post("/", UserController.create);

router.put("/:id", UserController.edit);

module.exports = router;
