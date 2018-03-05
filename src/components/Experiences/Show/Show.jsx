import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';

import './Show.scss';
import SlideShow from './SlideShow.js';
import Button from 'material-ui/Button';

import Location from 'material-ui-icons/LocationOn';
import Date from 'material-ui-icons/DateRange';
import Transfer from 'material-ui-icons/DirectionsBus';
import Language from 'material-ui-icons/Language';
import Payment from 'material-ui-icons/Payment';
import Timer from 'material-ui-icons/Timer';
import Cancel from 'material-ui-icons/Cancel';
import Car from 'material-ui-icons/DirectionsCar';

@inject('experience') @observer
export default class Show extends React.Component {

  componentWillMount() {
    const { experience } = this.props;
    experience.findBy({ id: this.props.params.experienceId }, {
      200: (body) => {
        experience.setSelected(body);
        this.setState({ values: body });
      },
      404: () => { this.notFound = true; }
    }); //GET REQUEST
  }

  renderIcons(selected) {
    let buffer = [];

    if (selected.location) {
      buffer.push(
        <li><span className="icon"><Location fontSize/> </span><span className="icon-text">{selected.location}</span></li>
      );
    }

    if (selected.calendar) {
      buffer.push(
        <li><span className="icon"><Date fontSize /> </span><span className="icon-text">{selected.calendar}</span></li>
      );
    }

    if (selected.duration) {
      buffer.push(
        <li><span className="icon"><Timer fontSize /> </span><span className="icon-text">{selected.duration}</span></li>
      );
    }

    if (selected.language) {
      buffer.push(
        <li><span className="icon"><Language fontSize /> </span><span className="icon-text">{selected.language}</span></li>
      );
    }

    if (selected.cancelation) {
      buffer.push(
        <li><span className="icon"><Cancel fontSize /> </span><span className="icon-text">{selected.cancelation}</span></li>
      );
    }

    if (selected.payment_method) {
      buffer.push(
        <li><span className="icon"><Payment fontSize /> </span><span className="icon-text">{selected.payment_method}</span></li>
      );
    }

    if (selected.has_transfer) {
      buffer.push(
        <li><span className="icon"><Transfer fontSize /> </span><span className="icon-text">Transfer Incluso</span></li>
      );
    }
    else {
      buffer.push(
        <li><span className="icon"><Car fontSize /> </span><span className="icon-text">Encontro no local</span></li>
      );
    }

    return buffer;
  }

  renderTopics(selected) {
    let buffer = [];

    if (selected.description) {
      buffer.push(
        <div className="topic-container">
          <div className="topic-title">A Experiência</div>
          <div className="topic-content">
          <span>
            {selected.description}
          </span>
          </div>
        </div>
      );
    }
    if (selected.itinerary) {
      buffer.push(
        <div className="topic-container">
          <div className="topic-title" >O que faremos?</div>
          <div className="topic-content">
          <span>
            {selected.itinerary}
          </span>
          </div>
        </div>
      );
    }
    if (selected.observation) {
      buffer.push(
        <div className="topic-container">
          <div className="topic-title">Informações Adicionais</div>
          <div className="topic-content">
          <span>
            {selected.observation}
          </span>
          </div>
        </div>
      );
    }
    if (selected.about_transfer) {
      buffer.push(
        <div className="topic-container">
          <div className="topic-title">Sobre o Transfer</div>
          <div className="topic-content">
          <span>
            {selected.about_transfer}
          </span>
          </div>
        </div>
      );
    }
    if (selected.about_booking) {
      buffer.push(
        <div className="topic-container">
          <div className="topic-title"> Seu Agendamento</div>
          <div className="topic-content">
          <span>
            {selected.about_booking}
          </span>
          </div>
        </div>
      );
    }
    if (selected.about_location) {
      buffer.push(
        <div className="topic-container" >
          <div className="topic-title">Sobre a Localização</div>
          <div className="topic-content">
          <span>
            {selected.about_location}
          </span>
          </div>
        </div>
      );
    }
    return buffer;
  }

  renderBookingCard(selected) {
    return (
      <div className="booking-card">
        <div className="content-wrap">
          <div className="price-container">
            <span className="price">{selected.price}</span>
            <span> por pessoa</span>
          </div>
          <div className="book-container">
            <Link to={`/book/${this.props.params.experienceId}`}>
              <Button
                className='mb-4 mt-3'
                variant='raised'
                size='large'
                fullWidth
                color='primary'
              >
                Verificar Disponibilidade
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { selected, isLoading } = this.props.experience;
    console.log(selected);
    if (isLoading) return <div className="container">Loading</div>
    return (
      <div id="Show" className="container">
        <div className="page-wrap">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <SlideShow>
                {selected.photos.map(photo => (
                  <img src={photo.url} />
                ))}
              </SlideShow>
              <div className="experience-name">
                <h2>{selected.name}</h2>
              </div>
              <div className="experience-icons">
                <ul>
                  {this.renderIcons(selected)}
                </ul>
              </div>
              <div style={{ whiteSpace: 'pre-wrap' }}>
              {this.renderTopics(selected)}
              </div>
            </div>
            <div className="col-md-4 sidebar" >
              {this.renderBookingCard(selected)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
