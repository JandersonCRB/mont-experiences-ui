import React, { Component } from 'react'

import { browserHistory } from 'react-router';

import { inject, observer } from 'mobx-react';

@inject('experience')
@inject('booking')
@inject('session') @observer
class BookingsNew extends Component {
	constructor(){
		super();
		this.state = {
			values:{
				name: '',

			}
		}
	}
	componentWillMount() {
		const { session, booking, experience } = this.props;
		experience.findBy({ id: this.props.params.experienceId });
	}

	render() {
		const { session } = this.props;
		if (!session.signedIn && !session.isLoading) {
			browserHistory.push('/users/sign_in');
		}
		else {
			const booking = this.props.booking;
			const experience = this.props.experience;
			return (
				<div className='container'>
					<form>
						<div className="col-sm-12 col-md-8">
							<div className="booking--form">
								<div className="row">
									<div className="col-md-8">
										<h3>Informações do Titular do Agendamento</h3>
										<label>NOME COMPLETO</label><br />
										<input type='text' value={this.state.values.name} /><br/>
										<label>EMAIL</label><br />
										<input type='text' value={this.state.values.email} />
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			)
		}
	}
}

export default BookingsNew;