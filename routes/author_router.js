const {Router} = require('express')
const {getAuthorController, postAuthorController} = require('../controllers/author_controller')

const authorRouter = new Router()

authorRouter.get('/', getAuthorController)
authorRouter.post('/', postAuthorController)

module.exports = {authorRouter}