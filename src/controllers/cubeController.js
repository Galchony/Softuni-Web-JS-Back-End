const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");
const { getDifficultyLevel } = require("../util/helpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/create", isAuth, (req, res) => {
  res.render("cube/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user._id,
  });
  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const cube = await cubeManager
    .getOneWithAccessories(req.params.cubeId)
    .lean();
  const isOwner = cube.owner?.toString() == req.user._id;
  res.render("cube/details", { cube, isOwner });
});

router.get("/:cubeId/attach-accessory", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager
    .getAllOthers(cube.accessories)
    .lean();
  const hasAccessories = accessories.length > 0;

  res.render("accessory/attachAccessory", {
    cube,
    accessories,
    hasAccessories,
  });
});
router.post("/:cubeId/attach-accessory", async (req, res) => {
  const { accessory: accessoryId } = req.body;
  const cubeId = req.params.cubeId;
  await cubeManager.attachAccessory(cubeId, accessoryId);
  res.redirect(`/cubes/${cubeId}/details`);
});

router.get("/:cubeId/delete", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const options = getDifficultyLevel(cube.difficultyLevel);

  res.render("cube/delete", { cube, options });
});
router.post("/:cubeId/delete", async (req, res) => {
  await cubeManager.delete(req.params.cubeId);
  res.redirect("/");
});

router.get("/:cubeId/edit", isAuth, async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  if (cube.owner.toString() !== req.user_id) {
    res.redirect("/404");
  }
  const options = getDifficultyLevel(cube.difficultyLevel);
  res.render("cube/edit", { cube, options });
});

router.post("/:cubeId/edit", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeManager.update(req.params.cubeId, {
    name,
    description,
    imageUrl,
    difficultyLevel,
  });

  res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;
