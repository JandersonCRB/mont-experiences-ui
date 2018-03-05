import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';
import { observable, action } from 'mobx';

class Session extends Connect {
    namespace = 'v1';
    resource = 'sessions';

    @observable signedIn = false;
    @observable email = null;
    current_user = observable(null);

    @action setSignedIn(status, email) {
        this.signedIn = status;
        if (status && email) {
            this.email = email;
        }
    }
    @action signOut(){
        localStorage.removeItem('email');
        localStorage.removeItem('token');

        this.signedIn = false;
        this.email = null;
        this.isLoading = false;
        this.current_user = null;
    }
    
    signIn(email = null, password = null, callback) {
        const store = {
            authentication_token: localStorage.getItem('token'),
            email: localStorage.getItem('email')
        }


        if (store.authentication_token && store.email) {
            this.signInFromStorage(store.email);
        } else if (email && password) {
            this.setIsLoading(true);
            let defaultCallback = {
                201: (body) => {
                    const { authentication_token, email } = body;
                    localStorage.setItem('email', email);
                    localStorage.setItem('token', authentication_token);
                    
                    this.signInFromStorage(email);
                },
                401: () => {
                    this.signOut();
                }
            }
            defaultCallback = Object.assign(defaultCallback, callback);
            this.create({}, { email, password }, defaultCallback);
        }
    }
    @action signInFromStorage(email) {
        this.findAll({}, {
            200: (body) => {
                this.email = email;
                this.signedIn = true;
                this.isLoading = false;

                this.current_user = body;
            },
            default: () => {
                this.signOut();
            }
        });
    }
}

mix(Session, scopes.readable);
mix(Session, scopes.writable);

export default Session;