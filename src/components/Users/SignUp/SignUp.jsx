import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { Link } from 'react-router';

import { inject, observer } from 'mobx-react';

import { browserHistory } from 'react-router';

import './SignUp.scss';

@inject('session') @observer
export default class SignUp extends Component {
	constructor() {
		super();
		this.state = {
			values:
				{
					email: '',
					password: ''
				}
		}
	}

	login = (e) => {
		e.preventDefault();
		const { email, password } = this.state.values;
		// const { session } = this.props;
		// session.SignUp(email, password);

	}
	change(e, v) {
		const values = Object.assign(this.state.values, { [e.target.name]: e.target.value }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
		this.setState({ values });
	}
	render() {
		if (this.props.session.signedIn) {
			browserHistory.push('/');
		}
		return (
			<div>
				<div className="col-md-4 col-sm-10 col-10 mx-auto text-center mb-5 mt-5" style={{ maxWidth: '450px' }}>
					<Paper elevation={6} style={{ borderRadius: "4px" }} className="p-5">
						<h3 className="title-header">Cadastre-se</h3>
						<form onSubmit={this.login}>
							<TextField
								name='email'
								className="w-100 mb-3"
								id='email'
								label="Email"
								value={this.state.email}
								onChange={e => this.change(e)}
							/>
							<TextField
								name='password'
								className='w-100 mb-3'
								type='password'
								id='password'
								label="Senha"
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
								Cadastrar
							</Button>
						</form>
						<Link to={'/'}>Reenviar email de confirmação</Link>
						<hr />
						<span>Já tem conta? <Link to={'/'}>Faça login</Link></span>
					</Paper>
				</div>
			</div>
		)
	}
}
