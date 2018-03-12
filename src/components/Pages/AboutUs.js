import React, { Component } from 'react';
import { Link } from 'react-router';

import BackgroundImage from '../../imgs/about.jpg';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Binoculars from '../../imgs/binoculars.png';
import Locked from '../../imgs/locked.png';
import MoneyBack from '../../imgs/money-back.png';

import './Pages.css';

var Background = {
  width: "100%",
  height: "500px",
  backgroundImage: "url(" + BackgroundImage + ")",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

export default class AboutUs extends Component {
  render() {
    return (
      <div>
        <div className="cover-section">
          <div style={ Background }>
          </div>
        </div>
        <div className="content-section">
          <div className="container">
            <div className="m-auto col-sm-8">
              <h2>Sobre a Mont</h2>
              <div className="content-text">
                <p>Mont é a melhor maneira de descobrir e agendar passeios, atividades, atrações e coisas para fazer.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-section alternative-bg">
          <div className="container">
            <div className="m-auto col-sm-8">
              <h2>Nosso Propósito</h2>
              <div className="content-text">
                <p>Acreditamos que podemos mudar a forma como as pessoas experienciam a vida e os lugares.
                 Por isso nós queremos levar experiências incríveis e inesquecíveis para as pessoas.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-section">
          <div className="container">
            <div className="m-auto col-sm-10 text-center">
              <h2 className="mb-5">Por Que Usar a Mont?</h2>
              <div className="content-text">
                <div className="row">
                  <div className="col-sm-4">
                  <Paper elevation={3} style={{ borderRadius: "12px", minHeight: "260px" }} className="p-3 mb-4">
                    <div className="icon-container"><img src={Binoculars} alt="" /></div>
                    <p>Tudo em um só lugar</p>
                    <span>A Mont possui as melhores experiências a um passo.</span>
                  </Paper>
                  </div>
                  <div className="col-sm-4">
                    <Paper elevation={3} style={{ borderRadius: "12px", minHeight: "260px" }} className="p-3 mb-4">
                      <div className="icon-container"><img src={MoneyBack} alt="" /></div>
                      <p>Garantimos o melhor preço</p>
                      <span>Um dos requisitos para estar na Mont é oferecer o melhor preço.</span>
                    </Paper>
                  </div>
                  <div className="col-sm-4">
                    <Paper elevation={3} style={{ borderRadius: "12px", minHeight: "260px" }} className="p-3 mb-4">
                      <div className="icon-container"><img src={Locked} alt="" /></div>
                      <p>Fácil e seguro</p>
                      <span>Agende com segurança e comodidade pela nossa plataforma.</span>
                    </Paper>
                  </div>
                </div>
              </div>
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
                  style={{ borderRadius: "12px", backgroundColor: "#fff", color: "#9C27B0", fontWeight: "700" }}
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
