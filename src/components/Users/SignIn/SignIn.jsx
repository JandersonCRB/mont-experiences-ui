import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import { Link } from 'react-router';

import { inject, observer } from 'mobx-react';

import { browserHistory } from 'react-router';

import './SignIn.css';

@inject('session') @observer
export default class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			values:
				{
					email: '',
					password: ''
				},
			snackbar: false
		}
	}

	login = (e) => {
		e.preventDefault();
		const { email, password } = this.state.values;
		const { session } = this.props;
		session.signIn(email, password, {
			401: () => {
				this.setState({ snackbar: true });
			}
		});

	}
	change(e, v) {
		const values = Object.assign(this.state.values, { [e.target.name]: e.target.value }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
		this.setState({ values });
	}

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ snackbar: false });
	}

	render() {
		if (this.props.session.signedIn) {
			browserHistory.push('/');
		}
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

						<h3 className="title-header">Entrar</h3>
						<form onSubmit={this.login}>
							<TextField
								required
								name='email'
								className="w-100 mb-3"
								id='email'
								label='Email'
								type='email'
								value={this.state.email}
								onChange={e => this.change(e)}
							/>
							<TextField
								required
								name='password'
								className='w-100 mb-3'
								type='password'
								id='password'
								label='Senha'
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
								Entrar
							</Button>
						</form>
						<Link to={'/'}>Esqueceu a senha?</Link>
						<hr />
						<span>Não tem uma conta? <Link to={'/'}>Cadastre-se</Link></span>
					</Paper>
				</div>
			</React.Fragment >
		)
	}
}
