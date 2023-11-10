const router = require("express").Router();
const postManager = require("../managers/bookManager");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/profile", isAuth, async (req, res) => {
  const wishingBooks = await postManager.getAllWishedBooks(req.user._id);
  res.render("profile", { wishingBooks });
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
