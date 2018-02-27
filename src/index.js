import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import { Router, browserHistory } from 'react-router';

import routes from './routes';

import { api } from 'fronto-api';
import { Provider } from 'mobx-react';
import stores from './stores';


import 'bootstrap/dist/css/bootstrap.min.css';
import './BootstrapOverride.scss';

const endpoint = api({
    endpoint: 'http://localhost:3000/',
    header: (h) => {}
});

const models = {
    experience: new stores.Experience(endpoint),
    user:       new stores.User(endpoint),
    session:    new stores.Session(endpoint)
}

ReactDOM.render(
    <Provider {...stores} {...models} >
        <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
