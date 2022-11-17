const {getAuthors, saveAuthor} = require('../dao/author_dao')

const getAuthorService = () => {
    return getAuthors()
}

const saveAuthorService = (author) => {
    return saveAuthor(author)
}

module.exports = {
    getAuthorService, saveAuthorService
}