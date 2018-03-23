import React, { Component } from 'react';

import { CircularProgress } from 'material-ui/Progress';

import { inject, observer } from 'mobx-react';

@inject('category')
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
				active: false,
				category_ids: ''
			},
			categories: [],
			errors: {},
			disabled: false
		}
		this.notFound = false;
	}

	componentWillMount() {

		const { experience, category } = this.props;
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
		category.load({}, {
			200: (body) => {
				this.setState({ categories: body });
			}
		})
	}

	change(e) {
		const values = Object.assign(this.state.values, { [e.target.name]: (e.target.type === "checkbox" ? e.target.checked : e.target.value) }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
		this.setState({ values });
	}

	submit(e) {
		e.preventDefault();
		this.setState({ disabled: true });
		const { values } = this.state;
		const { experience } = this.props;
		const { experienceId } = this.props.params;
		values.category_ids = [values.category_ids];
		experience.edit(experienceId, values, {
			201: (body) => {
				alert('Sucesso!');
				Object.keys(body).forEach(key => {
					body[key] = body[key] || '';
				})
				delete body.photos;
				delete body.cover_photo_url;
				experience.setSelected(body);
				this.setState({ disabled: false, values: body });
			},
			default: () => {
				alert('Ops, parece que algo deu errado.');
				this.setState({ disabled: false });
			}
		});

	}
	renderCategories() {
		const { categories } = this.state;
		return (
			<select name='category_ids' value={this.state.values.category_ids} onChange={(e) => this.change(e)}>
				<option value={''}>Selecione uma Categoria</option>
				{categories.map((category) => {
					return <option key={category.id} value={category.id}>{category.name}</option>
				})}
			</select>
		);
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

							<input name="has_transfer" type="checkbox" checked={values.has_transfer} onChange={e => this.change(e)} />
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

							<input name="active" type="checkbox" checked={values.active} onChange={e => this.change(e)} />
							<label>Ativo</label><br />

							<input name="recommended" type="checkbox" checked={values.recommended} onChange={e => this.change(e)} />
							<label>Recomendado</label><br />
						</div>
						<div {...props.grid}>
							<h2>Categorias</h2>
							{this.renderCategories()}
						</div>
					</div>
					<div className="row">
						<button className='w-100' type='submit' disabled={this.state.disabled}>Enviar</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Edit;