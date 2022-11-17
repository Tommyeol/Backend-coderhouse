const {Router} = require('express')
const {getBookController, postBookController} = require('../controllers/book_controller')

const bookRouter = new Router()

bookRouter.get('/', getBookController)
bookRouter.post('/', postBookController)

module.exports = {bookRouter}