const router = require("express").Router();
const userManager = require("../managers/userManager");
const { isAuth, isGuest } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/login", isGuest, (req, res) => {
  res.render("users/login");
});

router.get("/register", isGuest, (req, res) => {
  res.render("users/register");
});

router.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userManager.login(email, password);

    res.cookie("token", token);

    res.redirect("/");
  } catch (err) {
    res.render("users/login", { error: getErrorMessage(err) });
  }
});

router.post("/register", isGuest, async (req, res) => {
  const { username, password, email, repeatPassword } = req.body;
  try {
    const token = await userManager.register({
      username,
      password,
      email,
      repeatPassword,
    });
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    res.render("users/register", { error: getErrorMessage(err) });
  }
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
