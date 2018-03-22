import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';
import { action } from 'mobx';

class Experience extends Connect {
    namespace = 'v1';
    resource = 'experiences';

    @action load(query = {}, callback) {
        if(!query.id){
            var collection = localStorage.getItem('experiences');
            if(collection){
                try{
                    collection = JSON.parse(collection);
                }catch(error){
                    localStorage.clear('experiences');
                    collection = {};
                }
                this.setCollection(collection);
            }
        }else{
            var selected = localStorage.getItem(`experience_${query.id}`);
            if(selected){
                try{
                    selected = JSON.parse(selected)
                }catch(error){
                    localStorage.clear(`experience_${query.id}`);
                    selected = {};
                }
                this.setSelected(selected);
            }
        }
        if(!callback){
            callback = {
                201: (body) => query.id ? this.setSelected(body) : this.setCollection(body)
            }
        }
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}`;
        this.get(path, query, callback);
    }

    @action loadPhotos(id, callback = {}) {
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${id}/photos`;
        this.get(path, {}, callback);
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

    @action uploadPhotos(id, body = [], callback = {}){
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${id}/photos`;
        var data = new FormData();
        for(let i = 0;i < body.length;i++){
            console.log(body[i]);
            data.append('images[]', body[i]);
        }
        this.post(path, data, callback, true);
    }

    @action setCoverPhoto(experienceId, photoId, callback = {}){
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${experienceId}/photos/${photoId}/set_cover`;
        this.post(path, {}, callback);
    }

    @action deletePhoto(experienceId, photoId, callback = {}){
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${experienceId}/photos/${photoId}`;
        this.delete(path,callback);
    }

    @action edit(id, body = {}, callback = {}) {
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${id}`;
        this.put(path, body, callback);
    }

    @action deleteExperience({id, callback = {} } = {}){
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${id}`;
        this.delete(path, callback);
    }
}

mix(Experience, scopes.readable);
mix(Experience, scopes.writable);
mix(Experience, scopes.api);

export default Experience;