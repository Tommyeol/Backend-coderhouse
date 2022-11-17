const {getAuthorService, saveAuthorService} = require('../service/author_service')

const getAuthorController = (req, res) => {
    const authors = getAuthorService()

    res.json(authors)
}

const postAuthorController = (req, res) => {
    const author = req.body
    const authorReturn = saveAuthorService(author)
    res.status(201).json(authorReturn)
}

module.exports = {
    getAuthorController, postAuthorController
}