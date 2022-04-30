const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");



router.get("/api/posts/:id", auth.checkAuth, posts.detail);
router.post("/api/posts", auth.checkAuth, posts.create);
router.patch("/api/posts/:id", auth.checkAuth, posts.update);
router.delete("/api/posts/:id", auth.checkAuth, posts.delete);

router.get("/api/users", users.create);
router.post("/api/login", users.login);


//access to authenticated user only
router.get("/api/posts", auth.checkAuth, posts.list);

module.exports = router;

