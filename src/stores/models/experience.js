import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';
import { action } from 'mobx';

class Experience extends Connect {
    namespace = 'v1';
    resource = 'experiences';

    @action load(query = {}, callback = {}) {
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}`;
        this.get(path, query, callback);
    }
}

mix(Experience, scopes.readable);
mix(Experience, scopes.writable);
mix(Experience, scopes.api);

export default Experience;