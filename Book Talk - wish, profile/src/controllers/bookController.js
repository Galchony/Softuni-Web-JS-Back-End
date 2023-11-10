const router = require("express").Router();

const bookManager = require("../managers/bookManager");
const { isAuth, isOwner } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/create", isAuth, (req, res) => {
  res.render("books/create");
});

router.post("/create", isAuth, async (req, res) => {
  const { title, image, author, genre, review, stars } = req.body;
  const owner = req.user._id;
  try {
    await bookManager.create({
      title,
      image,
      author,
      genre,
      review,
      stars,
      wishingList: [],
      owner,
    });

    res.redirect("/books/catalog");
  } catch (err) {
    res.render("books/create", { error: getErrorMessage(err) });
  }
});

router.get("/catalog", async (req, res) => {
  const books = await bookManager.getAll();
  res.render("books/catalog", { books });
});

router.get("/:bookId/details", async (req, res) => {
  const bookId = req.params.bookId;
  const book = await bookManager.getOne(bookId);
  const isOwner = req.user?._id == book.owner._id;
  const isWished = book.wishingList.some((x) => x == req.user?._id);

  res.render("books/details", { book, isOwner, isWished });
});

router.get("/:bookId/delete", isAuth, isOwner, async (req, res) => {
  try {
    const bookId = req.params.bookId;
    await bookManager.del(bookId);

    res.redirect("/books/catalog");
  } catch (err) {
    res.render(`/books/details`, { error: "Unsuccessful book deletion" });
  }
});

router.get("/:bookId/edit", isAuth, isOwner, async (req, res) => {
  const bookId = req.params.bookId;
  const book = await bookManager.getOne(bookId);

  res.render(`books/edit`, { book });
});

router.post("/:bookId/edit", isAuth, isOwner, async (req, res) => {
  const bookData = req.body;
  try {
    const bookId = req.params.bookId;
    await bookManager.edit(bookId, bookData);

    res.redirect(`/books/${bookId}/details`);
  } catch (error) {
    res.render(`books/edit`, { error: "Unable update book", ...bookData });
  }
});

router.get("/:bookId/wish", isAuth, async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user._id;
    await bookManager.addWish(bookId, userId);

    res.redirect(`/books/${bookId}/details`);
  } catch (error) {
    res.render(`books/details`, {
      error: "Unable to wish book",
    });
  }
});

module.exports = router;


