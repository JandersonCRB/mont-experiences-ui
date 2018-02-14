import React from 'react';

import { Link } from 'react-router';

import './Navbar.scss';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
        <Link to={'/'} className="navbar-brand ml-5 mr-4">
          <img src={require('../imgs/mont_logo_dark.png')} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse justify-content-end collapse show" id="navbarCollapse">
          <form className="form-inline mt-4 mt-md-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item">
              <Link to={'/experiences'} className="nav-link">Experiências</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>

        </div>
      </nav>
      // <nav className="navbar">
      //   <div className="container">
      //     <div className="navbar-header">
      //       <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      //         <span className="sr-only">Toggle navigation</span>
      //         <span>
      //           <div className="icon--menu_mobile"></div>
      //           <div className="icon--menu_mobile"></div>
      //           <div className="icon--menu_mobile"></div>
      //         </span>
      //       </button>
      //       <Link to={'/'} className="navbar-brand">
      //         <img src={require('../imgs/mont_logo_dark.png')} alt="" />
      //       </Link>
      //     </div>
      //     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      //       <ul className="nav navbar-nav navbar-right">
      //         <li>Login</li>
      //         <li> <a href="">Cadastre-se</a></li>
      //         <li> <a href="#">Entrar</a></li>
      //         <li><a href="#">Meus Agendamentos</a></li>
      //         <li className="dropdown">
      //           <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
      //             <i className="icon icon--sm icon-User"></i>
      //             <span className="caret"></span>
      //           </a>
      //           <ul className="dropdown-menu">
      //             <li><Link to={'/experiences'}>Experiências</Link></li>
      //             <li><a href="#">Categorias</a></li>
      //             <li role="separator" className="divider"></li>
      //             <li><a href="">Editar Perfil</a></li>
      //             <li><a href="#">Sair</a></li>
      //           </ul>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      // </nav>

    )
  }
}