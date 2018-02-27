import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { Link } from 'react-router';

import { inject, observer } from 'mobx-react';

import './SignIn.scss';

@inject('session') @observer
export default class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      values:
      {
        email: '',
        password: ''
      }
    }
  }

  login = () => {
    const {email, password} = this.state.values
    this.props.session.createSession(email, password);
  }
  change(e, v) {
    const values = Object.assign(this.state.values, { [e.target.name]: e.target.value }) //values RECEIVES THE STATE WITH THE NEW MODIFIED ATTRIBUTES
		this.setState({ values });
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-sm-10 col-10 mx-auto text-center" style={{ maxWidth: '450px' }}>
            <Paper elevation={6} className="p-4">
              <h3>Entrar</h3>
              <TextField
                name='email'
                className="w-75 m-2"
                id='email'
                label="Email"
                value={this.state.email}
                onChange={e => this.change(e)}
              />
              <TextField
                name='password'
                className="w-75 m-2"
                id='password'
                label="Password"
                value={this.state.password}
                onChange={e => this.change(e)}
              />
              <Button
                className='mb-4 mt-3'
                variant='raised'
                size='large'
                style={{ color: 'purple' }}
                color='inherit'
                onClick={this.login}
              >
                Entrar
							</Button>
              <br />
              <Link to={'/'}>Esqueceu a senha?</Link>
              <hr />
              <span>Não tem uma conta? <Link to={'/'}>Cadastre-se</Link></span>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}