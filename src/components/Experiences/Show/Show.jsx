import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';

import './Show.css';
import SlideShow from './SlideShow.jsx';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Location from 'material-ui-icons/LocationOn';
import Date from 'material-ui-icons/DateRange';
import Transfer from 'material-ui-icons/DirectionsBus';
import Language from 'material-ui-icons/Language';
import Payment from 'material-ui-icons/Payment';
import Timer from 'material-ui-icons/Timer';
import Cancel from 'material-ui-icons/Cancel';
import Car from 'material-ui-icons/DirectionsCar';
import Currency from 'react-currency-formatter';

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
        <li key='location-icon'><span className="icon"><Location /> </span><span className="icon-text">{selected.location}</span></li>
      );
    }

    if (selected.calendar) {
      buffer.push(
        <li key='calendar-icon'><span className="icon"><Date /> </span><span className="icon-text">{selected.calendar}</span></li>
      );
    }

    if (selected.duration) {
      buffer.push(
        <li key='duration-icon'><span className="icon"><Timer /> </span><span className="icon-text">{selected.duration}</span></li>
      );
    }

    if (selected.language) {
      buffer.push(
        <li key='language-icon'><span className="icon"><Language /> </span><span className="icon-text">{selected.language}</span></li>
      );
    }

    if (selected.cancelation) {
      buffer.push(
        <li key='cancelation-icon'><span className="icon"><Cancel /> </span><span className="icon-text">{selected.cancelation}</span></li>
      );
    }

    if (selected.payment_method) {
      buffer.push(
        <li key='payment_method-icon'><span className="icon"><Payment  /> </span><span className="icon-text">{selected.payment_method}</span></li>
      );
    }

    if (selected.has_transfer) {
      buffer.push(
        <li key='bus-icon'><span className="icon"><Transfer /> </span><span className="icon-text">Transfer Incluso</span></li>
      );
    }
    else {
      buffer.push(
        <li key='car-icon'><span className="icon"><Car /> </span><span className="icon-text">Encontro no local</span></li>
      );
    }

    return buffer;
  }

  renderTopics(selected) {
    let buffer = [];

    if (selected.description) {
      buffer.push(
        <div className="topic-container" key='description'>
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
        <div className="topic-container" key='itinerary'>
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
        <div className="topic-container" key='observation'>
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
        <div className="topic-container" key='about_transfer'>
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
        <div className="topic-container" key='about_booking'>
          <div className="topic-title">Seu Agendamento</div>
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
        <div className="topic-container" key='about_location'>
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
      <Paper elevation={6} style={{ borderRadius: "4px" }} className="p-3 mb-4">
        <div className="price-container">
          <span className="price"><Currency quantity={Number(selected.price)} currency='BRL' /></span>
          <span> por pessoa</span>
        </div>
        <div className="booking-bottom">
          <Link to={`/book/${this.props.params.experienceId}`}>
            <Button
              className='mb-0 mt-2'
              variant='raised'
              size='large'
              fullWidth
              color='primary'
            >
              Solicitar Agendamento
            </Button>
          </Link>
        </div>
      </Paper>
    )
  }
  render() {
    const { selected, isLoading } = this.props.experience;
    if (isLoading) return <div className="container">Loading</div>
    return (
      <div id="Show" className="container">
        <div className="page-wrap">
          <div className="row">
            <div className="col-md-8 col-sm-12 mb-3">
              <SlideShow>
                {selected.photos.map((photo, key) => (
                  <img src={photo.url} key={key} alt="" />
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
