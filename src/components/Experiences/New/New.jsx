import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
// import Checkbox from 'material-ui/Checkbox';
// import { FormGroup, FormControlLabel } from 'material-ui/Form';

import { inject, observer } from 'mobx-react';

@inject('experience') @observer
class New extends Component {

	constructor(props) {
		super(props);
		this.state = {
			values: {
				name: '',
				description: '',
				itinerary: '',
				observation: ''
			},
			errors: {
				name: [],
				description: [],
				itinerary: [],
				observation: []
			}
		}
	}

	resetFields() {
		this.setState({
			values: {
				name: '',
				description: '',
				itinerary: '',
				observation: ''
			}
		});
	}

	submitExperience(event) {
		event.preventDefault();

		const { experience } = this.props;

		experience.create({}, this.state.values, {
			201: (response) => {
				experience.appendToCollection(response);
			},
			422: (response) => {
				this.setState(response);
			}
		})
	}

	change(e, v) {
		const values = Object.assign(this.state.values, { [e.target.name]: e.target.value })
		this.setState({ values });
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={e => this.submitExperience(e)}>
					<div className="row mb-2">
						<div className="ml-auto mr-auto">
							<Paper elevation={4} style={{ padding: 10 }}>

								<h1>Nova Experiência</h1>
								<TextField
									name="name"
									placeholder="Nome"
									label={this.state.errors.name[0] ? this.state.errors.name[0] : "Nome"}
									fullWidth
									error={this.state.errors.name[0] != null}
									value={this.state.values.name}
									onChange={e => this.change(e)}
								/>
								<br />
								<TextField
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
								<br />
								{/* <FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											name="has_transfer"
											label="Has Transfer"
											checked={this.state.has_transfer}
											onChange={(e, v) => this.change(e, v)}
										/>
									}
									label="Possui transfer"
								/>
							</FormGroup> */}
								<TextField
									name="itinerary"
									label="Itinerário"
									multiline
									fullWidth
									rows={3}
									value={this.state.values.itinerary}
									onChange={e => this.change(e)}
								/>
								<br />
								<TextField
									name="observation"
									label="Observações"
									multiline
									fullWidth
									rows={3}
									value={this.state.values.observation}
									onChange={e => this.change(e)}
								/>
								<br />
								<br />
								<Button variant="raised" color="secondary" onClick={e => this.submitExperience(e)} >Criar Experiência</Button>
							</Paper>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default New;

