const Book = require("../models/Book");

exports.create = async function (bookData) {
  await Book.create(bookData);
};

exports.getAll = async function () {
  return await Book.find().populate("owner").lean();
};

exports.getOne = async function (bookId) {
  return await Book.findById(bookId).populate("owner").lean();
};

exports.del = async function (bookId) {
  return await Book.findByIdAndDelete(bookId);
};

exports.edit = async function (bookId, bookData) {
  return await Book.findByIdAndUpdate(bookId, bookData);
};

exports.addWish = async function (bookId, wishData) {
  const book = await Book.findById(bookId);
  book.wishingList.push(wishData);

  return book.save();
};

exports.getAllWishedBooks = async function (userId) {
  return await Book.find({ wishingList: userId }).lean();
};

// exports.getByOwner = async function (userId) {
//   return await Book.find({ owner: userId }).populate("owner").lean();
// };

// exports.getAllWishes = async function (bookId) {
//   const data = await Book.findById(bookId).populate("votes");
//   return data.votes.map((x) => x.email).join(", ");
// };

