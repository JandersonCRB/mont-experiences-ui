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

const request = (method, path, callback, body) => {
	const h = new Headers();
	h.append('Content-Type', 'application/json');
	const { userCallback, defaultCallback } = callback;
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

	var status;
	fetch(new Request(url, options))
		.then(response => {
			status = response.status;
			return response.text()
			.then((text) =>{
				return text ? JSON.parse(text) : {}
			})
		})
		.then(body => {
			if (defaultCallback[status]){
				defaultCallback[status](body);
			} else if(defaultCallback['default']){
				defaultCallback['default'](body);
			}
			if (userCallback[status]){
				userCallback[status](body);
			} else if(userCallback['default']){
				userCallback['default'](body);
			}
		});

	return null;
};

const api = {
	get(path) {
		return request('GET', path);
	},
	post(path, data = {}, userCallback = {}) {
		const callback = { defaultCallback: {}, userCallback };
		return request('POST', path, callback, data);
	},
	put(path, data = {}, userCallback = {}) {
		const callback = { defaultCallback: {}, userCallback };
		this.setIsLoading(true);
		return request('PUT', path, callback, data);
	},
	delete(path) {
		return request('DELETE', path);
	}
}
export default { readable, writable, api };