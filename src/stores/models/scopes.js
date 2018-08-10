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
	}
}

const request = (method, path, callback, body, file = false) => {
	const h = new Headers();
	if(!file) h.append('Content-Type', 'application/json');
	const { userCallback, defaultCallback } = callback;
	const session = {
		email: localStorage.getItem('email'),
		token: localStorage.getItem('token'),
	};
	if (session.email && session.token) {
		h.append('X-User-Email', session.email);
		h.append('X-User-Token', session.token);
    h.append('Authorization', session.token);
	}


	const url = `${path}`;
	const options = { method, headers: h };

	if (body) {
		options.body = file ? body : JSON.stringify(body);
	}

	var status;
	fetch(new Request(url, options))
		.then(response => {
			status = response.status;
			return response.text()
				.then((text) => {
					return text ? JSON.parse(text) : {}
				})
		})
		.then(body => {
			if (userCallback[status]) {
				userCallback[status](body);
			} else if (userCallback['default']) {
				userCallback['default'](body);
			}
			if (defaultCallback[status]) {
				defaultCallback[status](body);
			} else if (defaultCallback['default']) {
				defaultCallback['default'](body);
			}
		});

	return null;
};


const api = {
	get(path, params = {}, userCallback = {}) {
		if (params.id) {
			path += `/${params.id}`;
		} else {
			if (Object.keys(params).length !== 0 && params.constructor === Object) { //checks if params is not empty
				path += `?`;
				Object.keys(params).map(e => {
					path += `${e}=${params[e]}&`;
					return null;
				})
				path = path.slice(0, -1); //Removes the last element. which is a '&' character
			}
		}

		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		const callback = { defaultCallback, userCallback };
		this.setIsLoading(true);
		return request('GET', path, callback);
	},
	post(path, data = {}, userCallback = {}, file = false) {
		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		const callback = { defaultCallback, userCallback };
		return request('POST', path, callback, data, file);
	},
	put(path, data = {}, userCallback = {}) {
		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		const callback = { defaultCallback, userCallback };
		this.setIsLoading(true);
		return request('PUT', path, callback, data);
	},
	delete(path, userCallback = {}) {
		const defaultCallback = {
			default: () => this.setIsLoading(false)
		}
		const callback = { defaultCallback, userCallback };
		this.setIsLoading(true);
		return request('DELETE', path, callback);
	}
}
export default { readable, writable, api };