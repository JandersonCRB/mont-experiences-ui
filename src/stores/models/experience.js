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

    /*
    * @param {callback} callback
    * Defines callback based on response status
    * Pass objects with status id as object name arrow functions to be executed after the fetch
    * You can use 'default' to execute some code if the response has a unhandled status
    */
    // @action new(callback = {}, body = {}, id = null){
    //     const path = `${this.api.endpoint}${this.namespace}/${this.resource}/`;
    //     path += id || '';
    //     console.log(path);
    // }

    @action edit(id, body = {}, callback = {}) {
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${id}`;
        this.put(path, body, callback);
    }
}

mix(Experience, scopes.readable);
mix(Experience, scopes.writable);
mix(Experience, scopes.api);

export default Experience;