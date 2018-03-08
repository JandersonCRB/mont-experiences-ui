import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';

class User extends Connect {
    //GAMBIARRA
    namespace = 'v1';
    resource = 'users';

    signUp(email, password, callback){
        this.create({},{
            user:{
                email,
                password
            }
        }, callback)
    }
}

mix(User, scopes.readable);
mix(User, scopes.writable);

export default User;