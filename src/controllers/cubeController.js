const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/:cubeId/details", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId);
  res.render("details", cube);
});

router.get("/:cubeId/attach-accessory", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager.getAll().lean();

  res.render("accessory/attachAccessory",  {cube , accessories });
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect("/");
});

module.exports = router;
