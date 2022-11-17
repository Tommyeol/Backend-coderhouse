const { bookRouter } = require("./book_router");
const { authorRouter } = require("./author_router");
const router = require("express").Router();

//Router
router.use("/api/books", bookRouter);
router.use("/api/authors", authorRouter);

module.exports = router;
