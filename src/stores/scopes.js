const readable = {
    find() { this.findBy(); },
    findBy(parameters, callback = {}) {
        this.setIsLoading(true);
        this.clearSelected();
        let defaultCallback={
            200: (body) => {this.setSelected(body);}
        }
        defaultCallback = Object.assign(defaultCallback, callback);
        this.call({ parameters, type: 'get' }, defaultCallback);
    },
    findAll(parameters) {
        this.setIsLoading(true);
        this.clearCollection();
        this.call({ parameters, type: 'get' }, {
            200: (body) => { this.setCollection(body); },
        })
    }
}

const writable = {
    update(parameters, body) {
        this.setIsLoading(true);
        this.call({ parameters, body, type: 'patch' }, {
            200: (response) => this.setSelected(response),
        });
    },
    create(parameters, body, callback) {
        this.setIsLoading(true);
        this.call({ parameters, body, type: 'post' }, callback);
    },
    delete(parameters) {
        this.setIsLoading(true);
        this.call({ parameters, type: 'delete'}, {
            200: (response) => this.removeFromColletion(response),
        });
    },
}
export default { readable, writable };