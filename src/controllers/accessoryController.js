const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("accessory/createAccessory");
});
router.post("/create", (req, res) => {

    
  res.redirect("/");
});

module.exports = router;
