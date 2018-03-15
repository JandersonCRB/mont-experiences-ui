import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

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
				has_transfer: true,
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
			errors: {},
			disabled: false
		}
		this.notFound = false;
	}

	componentWillMount() {

		const { experience } = this.props;
		experience.load({ id: this.props.params.experienceId }, {
			200: (body) => {
				Object.keys(body).forEach(key => {
					body[key] = body[key] || '';
				})
				delete body.photos;
				delete body.cover_photo_url;
				experience.setSelected(body);
				this.setState({ values: body });
			},
			404: () => { this.notFound = true; }
		}); //GET REQUEST
	}

	change(e) {
		const values = Object.assign(this.state.values, { [e.target.name]: (e.target.type === "checkbox" ? e.target.checked : e.target.value) }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
		this.setState({ values });
	}

	submit(e) {
		e.preventDefault();
		this.setState({ disabled: true });
		console.log(this.state.values);
	}

	render() {
		const { isLoading } = this.props.experience;
		const { values } = this.state;
		const props = {
			input: {
				className: "mb-2 w-100",
				onChange: e => this.change(e)
			},
			grid: {
				className: "col-md-6 col-lg-4 mb-2",
				style: { border: '1px solid', borderColor: 'black' }
			}
		}
		if (isLoading) {
			return (
				<div className="container">
					<div className="row">
						<CircularProgress className="mx-auto" color="primary" style={{ marginTop: 'auto', marginBottom: 'auto' }} thickness={7} />
					</div>
				</div>);
		} else if (this.notFound) {
			return <div>EXPERIENCE NOT FOUND</div>;
		}
		return (
			<div className="container">
				<form onSubmit={(e) => this.submit(e)}>
					<div className="row">
						<div {...props.grid}>
							<h2>Básico</h2>

							<label>Nome</label>
							<input name='name' value={values.name} {...props.input} />

							<label>Descrição</label>
							<textarea name='description' value={values.description} {...props.input} />

							<label>Itinerário</label>
							<textarea name='itinerary' value={values.itinerary} {...props.input} />

							<label>Observações</label>
							<textarea name='observation' value={values.observation} {...props.input} />
						</div>
						<div {...props.grid}>
							<h2>Local</h2>

							<label>Localização</label>
							<input name='location' value={values.location} {...props.input} />

							<label>Sobre a localização</label>
							<textarea name='about_location' value={values.about_location} {...props.input} />

							<label>Latitude</label>
							<input name='latitude' type='number' value={values.latitude} {...props.input} />

							<label>Longitude</label>
							<input name='longitude' type='number' value={values.longitude} {...props.input} />
						</div>
						<div {...props.grid}>
							<h2>Transfer</h2>

							<input name="has_transfer" type="checkbox" value={values.has_transfer} onChange={e => this.change(e)} />
							<label>Possui Transfer</label><br />
							<label>Sobre o Transfer</label>
							<textarea name='about_transfer' value={values.about_transfer} {...props.input} />
						</div>
						<div {...props.grid}>
							<h2>Booking</h2>

							<label>Sobre o Booking</label>
							<textarea name='about_booking' value={values.about_booking} {...props.input} />

							<label>Calendário</label>
							<input name='calendar' value={values.calendar} {...props.input} />

							<label>Linguagem</label>
							<input name='language' value={values.language} {...props.input} />
						</div>
						<div {...props.grid}>
							<h2>Pagamento</h2>

							<label>Preço</label>
							<input name='price' value={values.price} {...props.input} />

							<label>Forma de Pagamento</label>
							<input name='payment_method' value={values.payment_method} {...props.input} />

							<label>Cancelamento</label>
							<input name='cancelation' value={values.cancelation} {...props.input} />
						</div>
						<div {...props.grid}>
							<h2>Outras Informações</h2>

							<label>Duração</label>
							<input name='duration' value={values.duration} {...props.input} />

							<input name="active" type="checkbox" value={values.active} onChange={e => this.change(e)} />
							<label>Ativo</label><br />

							<input name="recommended" type="checkbox" value={values.recommended} onChange={e => this.change(e)} />
							<label>Recomendado</label><br />
						</div>
					</div>
					<div className="row">
						<button className='w-100' type='submit' disabled={this.state.disabled}>Enviar</button>
					</div>
				</form>
			</div>
		)
	}

	old() {
		return (
			//ADICIONAR CANCELAMENTO E CHECKBOXES
			<div className='container mb-4'>
				<div>
					<form className="row">
						<div className="col-md-6 col-lg-4" >
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