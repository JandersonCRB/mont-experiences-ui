import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';

import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import purple from 'material-ui/colors/purple';

import Currency from 'react-currency-formatter';

import './BookingsCollection.css';

import { Link } from 'react-router';

import moment from 'moment'
import 'moment/locale/pt-br.js';

@inject('booking') @observer
class BookingsCollection extends Component {
	constructor(){
		super();
		moment.locale('pt-br');
	}
	componentWillMount() {
		const { booking } = this.props;

		booking.findAll();
	}


	renderBooking = (booking) => {
		return (
			<li className="col-md-4 col-sm-6" key={booking.id}>
				<div className="booking-block">
					<Link to={`/bookings/${booking.id}`} style={{ textDecoration: 'none' }}>
						<Paper elevation={6} style={{ borderRadius: "4px" }} className="p-3">
							<div className="booking-name">{booking.experience.name}</div>
							<hr></hr>
							<div className="detail-section">
								<ul>
									<li className="col-sm-6 col-6">
										<div className="detail-title">Data</div>
										<div className="booking-detail">{moment(booking.dates).format('ll')}</div>
									</li>
									<li className="col-sm-6 col-6">
										<div className="detail-title">Pessoas</div>
										<div className="booking-detail">{booking.adults}</div>
									</li>
									<li className="col-sm-6 col-6">
										<div className="detail-title">Titular</div>
										<div className="booking-detail">{booking.name}</div>
									</li>
									<li className="col-sm-6 col-6">
										<div className="detail-title">Total</div>
										<div className="booking-detail"><Currency quantity={Number(booking.cost)} currency='BRL' /></div>
									</li>
								</ul>
							</div>
						</Paper>
					</Link>
				</div>
			</li>
		)
	}

	renderBookingsCollection = (collection) => {
		return (
			<ul>
				{collection.slice().map(booking => {
					return this.renderBooking(booking);
				})}
			</ul>
		)
	}
	render() {
		const { collection, isLoading } = this.props.booking;
		if (isLoading) {
			return <div className="container"><CircularProgress className="mr-auto ml-auto" style={{ color: purple[500] }} thickness={7} /></div>;
		} else {
			return (
				<div className="bookings-collection">
					<div className="container">
						<h3>Meus Agendamentos</h3>
						{this.renderBookingsCollection(collection)}
					</div>
				</div>
			)
		}
	}
}

export default BookingsCollection
