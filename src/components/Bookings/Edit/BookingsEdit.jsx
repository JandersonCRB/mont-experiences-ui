import React, { Component } from 'react'

import { inject, observer } from 'mobx-react';

import _ from 'lodash';

@inject('booking') @observer
class BookingsEdit extends Component {
	constructor() {
		super();
		this.state = {
			status: ''
		}
	}


	componentWillMount() {
		const { booking } = this.props;
		const id = this.props.params.bookingId;

		booking.load({
			query: { id },
			callback: {
				200: (body) => {
					booking.setSelected(body);
					this.setState({ status: body.status });
				}
			}
		})
	}


	change(e) {
		this.setState({ status: e.target.value });
	}

	submit(e) {
		e.preventDefault();

		const id = this.props.params.bookingId;
		const { booking } = this.props;

		booking.edit({
			id, body: this.state, callback: {
				200: () => {
					alert('Sucesso!');
				},
				default: () => {
					alert('Ocorreu um erro!');
				}
			}
		});
	}


	renderOptions() {
		let status = [
			{
				value: 1,
				status: 'Aguardando confirmação'
			},
			{
				value: 2,
				status: 'Confirmado'
			},
			{
				value: 3,
				status: 'Realizado'
			},
			{
				value: 4,
				status: 'Cancelado pelo viajante'
			},
			{
				value: 5,
				status: 'Cancelado pelo provedor da experiência'
			},
			{
				value: 6,
				status: 'Agendamento não aceito pelo provedor de experiência'
			},
			{
				value: 7,
				status: 'Agendamento não aprovado'
			}
		];
		return status.map((status, key) => {
			return <option key={key} value={status.value}>{status.status}</option>;
		})
	}

	render() {
		const { isLoading, selected } = this.props.booking;
		if (isLoading || _.isEmpty(selected)) return null;
		return (
			<div className="container">
				<div className="row">
					<div className="mx-auto">
						<form onSubmit={(e) => this.submit(e)}>
							<h2>Editar Booking</h2>
							<label>Status:</label>
							<select name="status" value={this.state.status} onChange={(e) => this.change(e)}>
								{this.renderOptions()}
							</select>
							<button type="submit">Salvar</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default BookingsEdit