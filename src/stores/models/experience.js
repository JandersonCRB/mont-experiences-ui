import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';

class Experience extends Connect {
    namespace = 'v1';
    resource = 'experiences';
}

mix(Experience, scopes.readable);
mix(Experience, scopes.writable);

export default Experience;