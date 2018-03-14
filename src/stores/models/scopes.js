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

const request = (method, path, body) => {
    const h = new Headers();
    h.append('Content-Type', 'application/json');

    const session = {
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
    };
    if (session.email && session.token) {
        h.append('X-User-Email', session.email);
        h.append('X-User-Token', session.token);
    }


    const url = `${path}`;
    const options = { method, headers: h };

    if (body) {
        options.body = JSON.stringify(body);
    }
    console.log(options.headers);
    console.log(url);
    return fetch(new Request(url, options));
};

const api = {
    get(path) {
        return request('GET', path);
    },
    post(path, data = {}) {
        return request('POST', path, data);
    },
    put(path, data = {}) {
        return request('PUT', path, data);
    },
    delete(path) {
        return request('DELETE', path);
    }
}
export default { readable, writable, api };