const router = require("express").Router();
const userManager = require("../managers/userManager");

router.get("/register", async (req, res) => {
  res.render("register");
});
router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  userManager.register({ username, password, repeatPassword });
  res.redirect("/users/login");
});

module.exports = router;
