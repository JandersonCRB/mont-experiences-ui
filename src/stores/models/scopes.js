const readable = {
    find() { this.findBy(); },
    findBy(parameters, callback = {}) {
        this.setIsLoading(true);
        this.clearSelected();
        let defaultCallback = {
            200: (body) => { this.setSelected(body); }
        }
        defaultCallback = Object.assign(defaultCallback, callback);
        this.call({ parameters, type: 'get' }, defaultCallback);
    },
    findAll(parameters, callback) {
        this.setIsLoading(true);
        this.clearCollection();
        let defaultCallback = {
            200: (body) => { this.setCollection(body); },
        }
        defaultCallback = Object.assign(defaultCallback, callback);
        this.call({ parameters, type: 'get' }, defaultCallback)
    }
}

const writable = {
    update(parameters, body, callback) {
        this.setIsLoading(true);
        let defaultCallback = {
            200: (response) => this.setSelected(response),
        }
        defaultCallback = Object.assign(defaultCallback, callback);
        this.call({ parameters, body, type: 'patch' }, defaultCallback);
    },
    create(parameters, body, callback) {
        this.setIsLoading(true);
        this.call({ parameters, body, type: 'post' }, callback);
    },
    delete(parameters) {
        this.setIsLoading(true);
        this.call({ parameters, type: 'delete' }, {
            200: (response) => this.removeFromColletion(response),
        });
    },
}
export default { readable, writable };