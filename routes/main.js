const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const connectController = require("../controllers/connect")
const uploadController = require("../controllers/upload")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex)
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/profile/:id", ensureAuth, postsController.getProfile);
router.get("/home", ensureAuth, postsController.getHome);
router.get("/following", ensureAuth, postsController.getFollowing);
router.get("/connect", ensureAuth, connectController.getConnect);
router.post("/followUser/:id", ensureAuth, postsController.followUser);


module.exports = router