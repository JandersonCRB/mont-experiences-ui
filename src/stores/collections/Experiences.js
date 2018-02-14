import { observable, action } from 'mobx';

import { browserHistory } from 'react-router';

import Api from '../api'

class Experiences {
    path ='/experiences';
    @observable all = [];
    @observable isLoading = false;

    @action async fetchAll(){
        this.isLoading = false;
        const response = await Api.get(this.path);
        const status = await response.status;

        if(status === 200) {
            const json = await response.json();
            this.all = await json.data
        }
    }

    @action async add(data, callback){
        const headers = new Headers();
        headers.append('Content-Type','application/json');

        const request = await Api.post(this.path, data);
        const response = await fetch(request);
        const status = await response.status;

        browserHistory.push('/experiences');
        if(status === 201) {
            this.fetchAll();
        }
    }
}

export default new Experiences();