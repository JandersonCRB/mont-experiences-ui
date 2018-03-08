import React, { Component } from 'react'

import { inject, observer } from 'mobx-react';

import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

import Currency from 'react-currency-formatter';


import './Show.scss';

@inject('booking') @observer
class BookingsShow extends Component {
	componentWillMount() {
		const { booking } = this.props;
		const id = this.props.params.bookingId;
		booking.findBy({ id });
	}

	renderBooking = (booking) => {
		if (!booking) return null;
		return (
			<div className="col-sm-8 mx-auto">
				<div className="booking-details">
					<div className="booking-name-2">{booking.experience.name}</div>
					<div className="booking-status">{booking.status}</div>
					<div className="detail-section">
						<ul>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Data</div>
								<div className="booking-detail-2">{booking.dates}</div>
							</li>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Pessoas</div>
								<div className="booking-detail-2">{booking.adults}</div>
							</li>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Valor por Pessoa</div>
								<div className="booking-detail-2"><Currency quantity={booking.experience.price} currency='BRL' /></div>
							</li>
							<li className="col-sm-6 col-6">
								<div className="detail-title">Total</div>
								<div className="booking-detail-2">{<Currency quantity={booking.cost} currency='BRL' />}</div>
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
				</div>
			</div>
		)
	}

	render() {
		const { isLoading, selected } = this.props.booking;
		if (isLoading) {
			return <CircularProgress className="mr-auto ml-auto" style={{ color: purple[500] }} thickness={7} />;
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
