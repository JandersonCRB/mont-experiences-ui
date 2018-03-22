import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import { Router, browserHistory } from 'react-router';

import routes from './routes';

import { api } from 'fronto-api';
import { Provider } from 'mobx-react';
import stores from './stores';
import purple from 'material-ui/colors/purple';

import ReactGA from 'react-ga';

import 'bootstrap/dist/css/bootstrap.min.css';
import './BootstrapOverride.scss';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


const theme = createMuiTheme({
    palette: {
        primary: { main: purple[500] },
        secondary: { main: purple[50] }
    },
});

const hostname = window && window.location && window.location.hostname;
var api_link = (hostname === 'montviagens.com' || hostname === 'www.montviagens.com') ? 'https://api.montviagens.com/' : 'http://localhost:3000/';
if(hostname === 'test.montviagens.com'){
    api_link = 'https://api.test.montviagens.com/';
}

const endpoint = api({
    endpoint: api_link,
    header: (h) => {
        h.append('Content-Type', 'application/json');
        h.append('X-User-Email', localStorage.getItem('email'));
        h.append('X-User-Token', localStorage.getItem('token'));
    }
});

const models = {
    experience: new stores.Experience(endpoint),
    booking: new stores.Booking(endpoint),
    user: new stores.User(endpoint),
    session: new stores.Session(endpoint),
    category: new stores.Category(endpoint)
}

const onUpdate = () => {
    window.scrollTo(0, 0);
    const hostname = window && window.location && window.location.hostname;
    if(hostname === 'montviagens.com' || hostname === 'www.montviagens.com'){
        ReactGA.pageview(window.location.pathname);
    }
}

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider {...stores} {...models} >
            <Router routes={routes} history={browserHistory} onUpdate={() => onUpdate()} />
        </Provider>
    </MuiThemeProvider>,
        document.getElementById('root'));

registerServiceWorker();
