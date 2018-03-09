import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Button from 'material-ui/Button';

import './Pages.scss';

export default class Partners extends Component {
  render() {
    return (
      <div>
        <div className="featured-section text-center top-section cover-section">
          <h1>Trabalhe com a Mont hoje.</h1>
        </div>
        <div className="content-section">
          <div className="container">
            <div className="m-auto col-sm-8">
              <h2>Seja Um Parceiro</h2>
              <div className="content-text">Mont é a melhor maneira de descobrir e agendar passeios, atividades, atrações e coisas para fazer.</div>
            </div>
          </div>
        </div>
        <div className="content-section alternative-bg">
          <div className="container">
            <div className="m-auto col-sm-8">
              <h2>Nossa Missão</h2>
              <div className="content-text">
                Nós queremos levar experiências incríveis e memoráveis para as pessoas.
              </div>
            </div>
          </div>
        </div>
        <div className="content-section">
          <div className="container">
            <div className="m-auto col-sm-8">
              <h2>Por que Usar a Mont?</h2>
              <div className="content-text">Mont é a melhor maneira de descobrir e agendar passeios, atividades, atrações e coisas para fazer.</div>
            </div>
          </div>
        </div>
        <div className="featured-section text-center">
          <div className="container">
            <div className="m-auto col-sm-8">
              <h2>Viva por Experiências!</h2>
              <Link to={`/`}>
                <Button
                  className='mb-0 mt-4'
                  variant='raised'
                  size='large'
                  color="secondary"
                >
                  Explorar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
