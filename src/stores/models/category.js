import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';
import { action } from 'mobx';

class Category extends Connect {
	namespace = 'v1';
	resource = 'categories';

	@action load(query = {}, callback = {}) {
		const path = `${this.api.endpoint}${this.namespace}/${this.resource}`;
		this.get(path, query, callback);
	}
}

mix(Category, scopes.readable);
mix(Category, scopes.writable);
mix(Category, scopes.api);

export default Category;