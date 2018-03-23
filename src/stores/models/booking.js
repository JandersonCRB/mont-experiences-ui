import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';
import { action } from 'mobx';

class Booking extends Connect {
    namespace = 'v1';
    resource = 'bookings';

    @action load({query = {}, callback = {}} = {}){
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}`;

        this.get(path, query, callback);
    }

    @action edit({
        id = 0,
        body = {},
        callback = {}
    } = {}) {
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${this.selected.id}`;
        this.put(path, body, callback);
    }
    @action getStatusName() {
        if (!this.selected) {
            return null;
        }
        const status = ['',
            'Aguardando confirmação', //1
            'Confirmado', //2 
            'Realizado', //3
            'Cancelado pelo viajante', //4
            'Cancelado pelo provedor da experiência', //5
            'Agendamento não aceito pelo provedor de experiência', //6
            'Agendamento não aprovado' //7
        ];
        return status[this.selected.status];
    }
    @action cancel() {
        if (!this.selected) {
            return null;
        }
        const path = `${this.api.endpoint}${this.namespace}/${this.resource}/${this.selected.id}/cancel`;
        this.put(path, {}, {
            200: (body) => {
                this.setSelected(body);

                this.setIsLoading(false);
            },
            default: () => {
                this.setIsLoading(false);
            }
        });
    }
}

mix(Booking, scopes.api);
mix(Booking, scopes.readable);
mix(Booking, scopes.writable);

export default Booking;