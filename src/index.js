const express = require("express");

const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const dbConnect = require("./config/dbConfig");

const homeController = require("./controllers/homeController");
const cubeController = require("./controllers/cubeController");
const accessoryController = require("./controllers/accessoryController");
const userController = require("./controllers/userController");

const app = express();
const PORT = 6050;

expressConfig(app);
handlebarsConfig(app);

dbConnect()
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((err) => console.log("DB error: ", err.message));

app.use(homeController);
app.use("/cubes", cubeController);
app.use("/accessories", accessoryController);
app.use("/users", userController);
app.get("*", (req, res) => {
  res.redirect("/404");
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
