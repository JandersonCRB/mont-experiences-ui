import React from 'react';
import { inject, observer } from 'mobx-react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Show.scss';
import Location from 'material-ui-icons/LocationOn';

const styles = {
  icon: {
    color: "#484848",
    fontSize: "20px"
  }
}

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
        <li><span className="icon"><Location fontSize style={styles.icon} /> </span><span>{selected.location}</span></li>
      );
    }

    if (selected.calendar) {
      buffer.push(
        <li>{selected.calendar}</li>
      );
    }

    if (selected.duration) {
      buffer.push(
        <li>{selected.duration}</li>
      );
    }

    if (selected.language) {
      buffer.push(
        <li>{selected.language}</li>
      );
    }

    if (selected.cancelation) {
      buffer.push(
        <li>{selected.cancelation}</li>
      );
    }

    if (selected.payment_method) {
      buffer.push(
        <li>{selected.payment_method}</li>
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
          <div className="topic-title">O que faremos?</div>
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
        <div className="topic-container">
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

  renderImages(selected) {
    return (
      <div className="m-5">
        <Slider dots>
          {selected.photos.map(photo => (
            <div>
              <img src={photo.url} />
              {/* {console.log(photo.url)} */}
            </div>
          ))}
        </Slider>
      </div>
    )
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
          <button className="btn btn-book w-100">Verificar Disponibilidade</button>
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
              <div className="experience-name">
                <h2>{selected.name}</h2>
              </div>
              <div className="experience-icons">
                <ul>
                  {this.renderIcons(selected)}
                </ul>
              </div>
              <div>
              {this.renderTopics(selected)}
              </div>
            </div>
            <div className="col-md-4 sidebar">
              {this.renderBookingCard(selected)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
