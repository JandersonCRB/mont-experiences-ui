import React, { Component } from 'react'

import { inject, observer } from 'mobx-react';

import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import moment from 'moment'
import 'moment/locale/pt-br.js';

import Currency from 'react-currency-formatter';


import './Show.css';

@inject('booking') @observer
class BookingsShow extends Component {
	constructor(){
		super();
		this.state = {disabled: false}
		moment.locale('pt-br');
	}
	componentWillMount() {
		const { booking } = this.props;
		const id = this.props.params.bookingId;
		booking.findBy({ id });
	}

	renderBooking = (booking) => {
		if (!booking.experience) return null;
		return (
			<div className="col-sm-8 mx-auto">
				<div className="booking-details">
					<div className="booking-name-2">{booking.experience.name}</div>
					<div className="booking-status">{this.props.booking.getStatusName()}</div>
					<div className="detail-section">
						<ul>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Data</div>
								<div className="booking-detail-2">{moment(booking.dates).format('LL')}</div>
							</li>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Pessoas</div>
								<div className="booking-detail-2">{booking.adults}</div>
							</li>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Valor por Pessoa</div>
								<div className="booking-detail-2"><Currency quantity={Number(booking.experience.price)} currency='BRL' /></div>
							</li>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Total</div>
								<div className="booking-detail-2">{<Currency quantity={Number(booking.cost)} currency='BRL' />}</div>
							</li>
						</ul>
					</div>
					<hr></hr>
					<div className="detail-section">
						<ul>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Titular</div>
								<div className="booking-detail">{booking.name}</div>
							</li>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Forma de Pagamento</div>
								<div className="booking-detail">{booking.experience.payment_method}</div>
							</li>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Política de Cancelamento</div>
								<div className="booking-detail">{booking.experience.cancelation}</div>
							</li>
						</ul>
					</div>
					{/* <Button color='primary' variant='raised' disabled={this.state.disabled} onClick={this.cancel}> Cancelar </Button> */}
				</div>
			</div>
		)
	}
	cancel = (e) => {
		this.props.bookings.cancel();
		this.setState({disabled: true});
	}
	render() {
		const { isLoading, selected } = this.props.booking;
		if (isLoading) {
			return <CircularProgress className="mr-auto ml-auto" color='primary' thickness={7} />;
		} else {
			return (
				<div className="container">
					{this.renderBooking(selected)}
				</div>
			)
		}
	}
}

export default BookingsShow
