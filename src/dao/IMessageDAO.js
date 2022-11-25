const DaoException = require("../errors/DaoException");

class IMessageDAO {
    constructor() {}

    async create(data) {
        throw new DaoException("need to implement create()");
    }

    async findById(id) {
        throw new DaoException("need to implement findById()");
    }

    async findAll() {
        throw new DaoException("need to implement findAll()");
    }

    async update(id, toUpdate) {
        throw new DaoException("need to implement update()");
    }

    async remove(id) {
        throw new DaoException("need to implement remove()");
    }
}

module.exports = IMessageDAO;
