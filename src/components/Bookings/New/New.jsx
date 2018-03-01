import 'react-dates/initialize';
import React, { Component } from 'react'

import { browserHistory } from 'react-router';

import { inject, observer } from 'mobx-react';

import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';

@inject('experience')
@inject('booking')
@inject('session') @observer
class BookingsNew extends Component {
	
	constructor() {
		super();
		moment.locale('pt-br');
		console.log(moment());
		this.state = {
			values: {
				name: '',
				dates: moment()
			},
			activeStep: 0
		}
	}
	componentWillMount() {
		const { session, booking, experience } = this.props;
		experience.findBy({ id: this.props.params.experienceId });
	}


	handleBack = () => {
		const { activeStep } = this.state;
		this.setState({
			activeStep: activeStep - 1,
		});
	};

	handleNext = () => {
		const { activeStep } = this.state;
		let { skipped } = this.state;
		this.setState({
			activeStep: activeStep + 1,
			skipped,
		});
	};

	getStepContent(step) {
		switch (step) {
			case 0:
				return (
					// https://github.com/airbnb/react-dates
					<SingleDatePicker
						date={this.state.values.dates}
						onDateChange={dates => this.setState({ values: {dates} })}
						focused={this.state.focused} // PropTypes.bool
						onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
					/>
				)
			case 1:
				return 'What is an ad group anyways?';
			case 2:
				return 'This is the bit I really care about!';
			default:
				return 'Unknown step';
		}
	};

	render() {
		const { session } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;
		if (!session.signedIn && !session.isLoading) {
			browserHistory.push('/users/sign_in');
		}
		else {
			const booking = this.props.booking;
			const experience = this.props.experience;
			return (
				<div className='container'>
					<Stepper activeStep={activeStep}>
						{steps.map((label, index) => {
							return (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>

					<div>
						{activeStep === steps.length ? (
							<div>
								<span>
									All steps completed - you&quot;re finished
              </span>
								<Button onClick={this.handleReset}>
									Reset
              </Button>
							</div>
						) : (
								<div>
									{this.getStepContent(activeStep)}
									<div className="row">
										<Button
											disabled={activeStep === 0}
											onClick={this.handleBack}
										>
											Voltar
                </Button>
										<div className="ml-auto">
											<Button
												variant="raised"
												color="primary"
												onClick={this.handleNext}
											>
												{activeStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
											</Button>
										</div>
									</div>
								</div>
							)}
					</div>
				</div>
			)
		}
	}
}

export default BookingsNew;

function getSteps() {
	return ['Escolha a data que melhor se encaixa para você', 'Conte-nos como podemos chegar até você', 'Revise e confirme as informações inseridas'];
}
