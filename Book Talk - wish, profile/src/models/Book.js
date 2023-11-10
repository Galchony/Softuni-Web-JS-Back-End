const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    minLength: [2, "Title should be at least 2 chars!"],
  },
  image: {
    type: String,
    required: [true, "Image is required!"],
    match: [/^https?:\/\//, "Invalid url"],
  },
  author: {
    type: String,
    required: [true, "Author is required!"],
    minLength: [5, "Author should be at least 5 chars!"],
  },
  review: {
    type: String,
    required: [true, "Review is required!"],
    minLength: [10, "Review should be at least 10 chars!"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required!"],
    minLength: [3, "Genre should be at least 3 chars!"],
  },
  stars: {
    type: Number,
    required: [true, "Stars are required!"],
    min: [1, "Stars are number between 1 and 5"],
    max: [5, "Stars are number between 1 and 5"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  wishingList: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
