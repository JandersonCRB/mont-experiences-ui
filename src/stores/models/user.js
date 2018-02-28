import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';

class User extends Connect {
    namespace = 'v1';
    resource = 'users';

    createSession = (email, password) => {
        // console.log(email);
        // console.log(password);
        // setIsLoading(true);
    }
}

mix(User, scopes.readable);
mix(User, scopes.writable);

export default User;