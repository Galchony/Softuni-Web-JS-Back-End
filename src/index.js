const express = require("express");

const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const dbConnect = require("./config/dbConfig");

const homeController = require("./controllers/homeController");
const cubeController = require("./controllers/cubeController");

const app = express();
const PORT = 6050;

expressConfig(app);
handlebarsConfig(app);

// async function a() {
//   return await dbConnect();
// }
// a();
dbConnect()
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((err) => console.log("DB error: ", err.message));
app.use(homeController);
app.use("/cubes", cubeController);
app.get("*", (req, res) => {
  res.redirect("/404");
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
