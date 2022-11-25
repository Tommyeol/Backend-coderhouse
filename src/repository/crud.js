class MongoCRUD {
    constructor(model) {
        this.model = model;
    }

    /**
     * Return object
     */
    getModel() {
        return this.model;
    }

    /**
     * Create object
     * @param {Object} userData
     */
    async create(data) {
        return this.model.create(data);
    }

    /**
     * Find object by ID
     * @param {Number} id
     */
    async findById(id) {
        return this.model.findById(id);
    }

    /**
     * Find all objects
     */
    async findAll() {
        return this.model.find({});
    }

    /**
     * Update object by id
     * @param {String} id mongodb id
     * @param {Object} toUpdate data to update
     */
    async update(id, toUpdate) {
        return this.model.findByIdAndUpdate(id, toUpdate);
    }

    /**
     * Delete object by id
     * @param {String} id mongodb id
     */
    async remove(id) {
        return this.model.findByIdAndDelete(id);
    }
}

module.exports = MongoCRUD;
