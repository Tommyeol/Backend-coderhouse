const {getBooks, saveBook} = require('../dao/book_dao')

const getBookService = () => {
    return getBooks()
}

const saveBookService = (book) => {
    book.keyname = book.name.replace(/ /g, '_').toLowerCase()
    return saveBook(book)
}

module.exports = {
    getBookService, saveBookService
}