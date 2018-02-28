import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';

class Booking extends Connect {
    namespace = 'v1';
    resource = 'bookings';
}

mix(Booking, scopes.readable);
mix(Booking, scopes.writable);

export default Booking;