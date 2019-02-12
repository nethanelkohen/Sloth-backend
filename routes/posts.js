const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts.controller");

router.post("/", PostController.create);

router.get("/:id", PostController.get);

router.get("/one/:station", PostController.getPostsbyStation);

router.get("/all/:station", PostController.getAllPostsbyStation);

router.put("/increment/:id", PostController.changeScore);

router.put("/decrement/:id", PostController.changeScore);

module.exports = router;
