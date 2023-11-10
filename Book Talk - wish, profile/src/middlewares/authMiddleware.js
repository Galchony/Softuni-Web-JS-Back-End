const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");
const bookManager = require("../managers/bookManager");

exports.auth = async (req, res, next) => {
  const token = req.cookies["token"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
    } catch (error) {
      res.clearCookie("token");
      res.redirect("users/login");
    }
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect("/users/login");
  }
  next();
};

exports.isGuest = function (req, res, next) {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.isOwner = async function (req, res, next) {
  const book = await bookManager.getOne(req.params.bookId);

  if (book.owner._id != req.user._id) {
    return res.redirect("/");
  } else {
    next();
  }
};
