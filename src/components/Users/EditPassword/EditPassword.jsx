import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { inject, observer } from 'mobx-react';

import { browserHistory } from 'react-router';

@inject('user') @observer
class EditPassword extends Component {
	constructor() {
		super();
		this.state = {
			values: {
				current_password: '',
				password: '',
				password_confirmation: ''
			}
		}
	}

	submit = e => {
		console.log(e);
		e.preventDefault();

		const { user } = this.props;
		const { current_password, password, password_confirmation } = this.state.values;
		const body = { user: { current_password, password, password_confirmation } }
		user.update({}, body, {
			201: () => {
				browserHistory.push('/');
			}
		});
	}

	change(e) {
		const values = Object.assign(this.state.values, { [e.target.name]: e.target.value }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
		this.setState({ values });
	}

	render() {
		return (
			<React.Fragment>
				<div style={{ width: '100%', height: '48px', marginTop: '-1.5rem' }}>
					<Snackbar
						style={{ position: 'relative', color: '#cecece' }}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
						autoHideDuration={6000}
						open={this.state.snackbar}
						onClose={this.handleClose}
						message={<span id="message-id">Email ou senha incorretos</span>}
						SnackbarContentProps={{
							style: {
								backgroundColor: '#b05d5a'
							}
						}}
					/>
				</div>
				<div className="col-md-4 col-sm-10 col-10 mx-auto text-center mb-5 mt-3" style={{ maxWidth: '450px' }}>
					<Paper elevation={6} style={{ borderRadius: "4px" }} className="p-5">
						<form onSubmit={this.submit}>
							<h3 className="title-header">Alterar Senha</h3>
							<TextField
								required
								name='password'
								className='w-100 mb-3'
								type='password'
								id='password'
								label='Nova Senha'
								value={this.state.password}
								onChange={e => this.change(e)}
								inputProps={{
									minLength: 6
								}}
							/>
							<TextField
								required
								name='password_confirmation'
								className='w-100 mb-3'
								type='password'
								id='password_confirmation'
								label='Repita a nova senha'
								value={this.state.password}
								onChange={e => this.change(e)}
								inputProps={{
									minLength: 6
								}}
							/>
							<TextField
								required
								name='current_password'
								className='w-100 mb-3'
								type='password'
								id='current_password'
								label='Senha Atual'
								value={this.state.password}
								onChange={e => this.change(e)}
							/>
							<Button
								type='submit'
								className='mb-4 mt-3'
								variant='raised'
								size='large'
								fullWidth
								color='primary'
							>
								Salvar
						</Button>
						</form>
					</Paper>
				</div>
			</React.Fragment>
		)
	}
}

export default EditPassword