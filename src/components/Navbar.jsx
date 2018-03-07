import React from 'react';

import { Link } from 'react-router';

import './Navbar.scss';
import { inject, observer } from 'mobx-react';

@inject('session') @observer
export default class NavBar extends React.Component {

  componentWillMount () {
  }

  signOut = (e) => {
    e.preventDefault();

    this.props.session.signOut();
  }

  guestOrMember = () => {
    const { session } = this.props;
    if (session.signedIn) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={'/bookings'} className="nav-link">Meus Agendamentos</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={'#'} className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{session.email}</Link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={'#'} className="dropdown-item">Editar Perfil</Link>
              <div class="dropdown-divider"></div>
              <a href='' className="dropdown-item" onClick={this.signOut}>Sair</a>
            </div>
          </li>
          <li className="nav-item">

          </li>
        </ul>
      )
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={'/users/sign_in'} className="nav-link">Entrar</Link>
          </li>
          <li className="nav-item">
            <Link to={'/users/sign_up'} className="nav-link">Cadastre-se</Link>
          </li>
        </ul>
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark mb-4">
        <Link to={'/'} className="navbar-brand">
          <img src={require('../imgs/mont_logo_white.png')} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse justify-content-end collapse" id="navbarCollapse">
          {/* <form className="form-inline mt-4 mt-md-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
          {this.guestOrMember()}
        </div>
      </nav>
    )
  }
}
