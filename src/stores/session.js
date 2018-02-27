import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';

class Session extends Connect {
    namespace = 'v1';
    resource = 'sessions';

    createSession(email, password){
        // console.log(email);
        // console.log(password);
        this.setIsLoading(true);


    }
}

mix(Session, scopes.readable);
mix(Session, scopes.writable);

export default Session;