const router = require("express").Router();
const userManager = require("../managers/userManager");
const { extractErrorMessages } = require("../utils/errorHelpers");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    await userManager.register({ username, password, repeatPassword });
    res.redirect("/users/login");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    res.status(404).render("user/register", { errorMessages });
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await userManager.login(username, password);
  res.cookie("token", token);

  res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
