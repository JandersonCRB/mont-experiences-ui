import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

import { inject, observer } from 'mobx-react';

@inject('experience') @observer
class Edit extends Component {
	constructor(props) {
		super();
		this.state = {
			values: {
				name: '',
				description: '',
				itinerary: '',
				observation: '',
				location: '',
				about_location: '',
				latitude: '',
				longitude: '',
				has_transfer: false,
				about_transfer: '',
				about_booking: '',
				price: '',
				payment_method: '',
				cancelation: '',
				calendar: '',
				duration: '',
				language: '',
				recommended: false,
				active: false
			},
			errors: {}
		}
		this.notFound = false;
	}

	componentWillMount() {

		const { experience } = this.props;
		experience.findBy({id: this.props.params.experienceId},{
			200: (body) => {
				experience.setSelected(body);
				this.setState({values: body})
			},
			404: () => {this.notFound = true;}
		}); //GET REQUEST
	}

	change(e, v) {

		const values = Object.assign(this.state.values, { [e.target.name]: e.target.value }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
		this.setState({ values });
	}

	submitExperience(e) {
		e.preventDefault();

		console.log(this.state);
	}
	render() {
		const { selected, isLoading } = this.props.experience;
		if (isLoading){
			return <CircularProgress className="mr-auto ml-auto" style={{ color: purple[500] }} thickness={7} />;
		}else if(this.notFound){
			return <div>EXPERIENCE NOT FOUND</div>;
		}
		console.log(selected);
		return (
			//ADICIONAR CANCELAMENTO E CHECKBOXES
			<div className='container mb-4'>
				<div>
					<form className="row">
						<div className="col-md-6 col-lg-4">
							<Paper style={{ padding: 10, margin: 5 }}>
								<h2>Básico</h2>
								<TextField
									className="mt-3 mb-3"
									inputRef={e => this.name = e}
									name="name"
									label="Nome"
									fullWidth
									value={this.state.values.name}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									name="description"
									label="Descrição"
									placeholder="Insira a descrição"
									multiline
									fullWidth
									rows={3}
									rowsMax={10}
									value={this.state.values.description}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									name="itinerary"
									label="Itinerário"
									placeholder="Insira ao itinerário"
									multiline
									fullWidth
									rows={3}
									rowsMax={10}
									value={this.state.values.itinerary}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									name="observation"
									label="Observações"
									placeholder="Insira as observações"
									multiline
									fullWidth
									rows={3}
									rowsMax={10}
									value={this.state.values.observation}
									onChange={e => this.change(e)}
								/>
							</Paper>
						</div>
						<div className="col-md-6 col-lg-4">
							<Paper style={{ padding: 10, margin: 5 }}>
								<h2>Local</h2>
								<TextField
									className="mt-3 mb-3"
									name="location"
									label="Localização"
									fullWidth
									value={this.state.values.location}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									name="about_location"
									label="Sobre a localização"
									multiline
									fullWidth
									rows={3}
									rowsMax={10}
									value={this.state.values.about_location}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									type='number'
									name="latitude"
									label="Latitude"
									fullWidth
									value={this.state.values.latitude}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									type='number'
									name="longitude"
									label="Longitude"
									fullWidth
									value={this.state.values.longitude}
									onChange={e => this.change(e)}
								/>
							</Paper>
						</div>
						<div className="col-md-6 col-lg-4">
							<Paper style={{ padding: 10, margin: 5 }}>
								<h2>Transfer</h2>
								<TextField
									className="mt-3 mb-3"
									name="about_transfer"
									label="Sobre o transfer"
									multiline
									fullWidth
									rows={3}
									rowsMax={10}
									value={this.state.values.about_transfer}
									onChange={e => this.change(e)}
								/>
								LEMBRAR DE ADICIONAR CHECKBOX
							</Paper>

						</div>
						<div className="col-lg-4 col-md 6">
							<Paper style={{ padding: 10, margin: 5 }}>
								<h2>Booking</h2>
								<TextField
									className="mt-3 mb-3"
									name="about_booking"
									label="Sobre o booking"
									multiline
									fullWidth
									rows={3}
									rowsMax={10}
									value={this.state.values.about_booking}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									name="calendar"
									label="Calendário"
									fullWidth
									value={this.state.values.calendar}
									onChange={e => this.change(e)}
								/>
							</Paper>
						</div>
						<div className="col-md-6 col-lg-4">
							<Paper style={{ padding: 10, margin: 5 }}>
								<h2>Pagamento</h2>
								<TextField
									className="mt-3 mb-3"
									type='number'
									name="price"
									label="Preço"
									fullWidth
									value={this.state.values.price}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									name="payment_method"
									label="Método de pagamento"
									fullWidth
									value={this.state.values.payment_method}
									onChange={e => this.change(e)}
								/>
							</Paper>
						</div>
						<div className="col-md-6 col-lg-4">
							<Paper style={{ padding: 10, margin: 5 }}>
								<h2>Outras informações</h2>
								<TextField
									className="mt-3 mb-3"
									name="duration"
									label="Duração"
									fullWidth
									value={this.state.values.duration}
									onChange={e => this.change(e)}
								/>
								<TextField
									className="mt-3 mb-3"
									name="language"
									label="Linguagem"
									fullWidth
									value={this.state.values.language}
									onChange={e => this.change(e)}
								/>
							</Paper>
						</div>
						<Button className="mr-auto ml-auto" variant="raised" color="secondary" size="large" onClick={e => this.submitExperience(e)} >Editar Experiência</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default Edit;