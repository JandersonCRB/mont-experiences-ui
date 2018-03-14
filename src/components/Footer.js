import React, { Component } from "react";
import { Link } from 'react-router';

import './Footer.css';

export default class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="footer-menu">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="menu-header">Sobre</div>
                <ul>
                  <li><Link to={'/about'} >Sobre Nós</Link></li>
                  <li>Política de Privacidade</li>
                  <li>Termos e Condições</li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="menu-header">Ajuda</div>
                <ul>
                  <li><Link to={'/help'} >Perguntas Frequentes</Link></li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="menu-header">Trabalhe Conosco</div>
                <ul>
                  <li></li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
              <div className="menu-header">Fale com a Mont</div>
              <ul>
                <li>suporte@montviagens.com</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-end">
          <div className="container">
            <span>© 2018 Mont</span>
          </div>
        </div>
      </footer>
    )
  }
}
