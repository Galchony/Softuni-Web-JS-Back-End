const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "First name is required!"],
    minLength: [3, "First name should be at least 3 chars!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [4, "Password should be at least 4 chars!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    minLength: [10, "Email should be at least 10 chars!"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (this.password !== value) {
    throw new Error("Password missmatch!");
  }
});
userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
