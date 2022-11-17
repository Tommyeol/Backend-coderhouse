const {getBookService, saveBookService} = require('../service/book_service')

const getBookController = (req, res) => {
    const books = getBookService()

    res.json(books)
}

const postBookController = (req, res) => {
    const book = req.body
    const bookReturn = saveBookService(book)
    res.status(201).json(bookReturn)
}

module.exports = {
    getBookController, postBookController
}