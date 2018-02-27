import React from 'react';
import { inject, observer } from 'mobx-react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Show.scss';

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

  renderTopics(selected) {
    let buffer = [];

    if (selected.description) {
      buffer.push(
        <div className="experience-topic">
          <h4>A Experiência</h4>
          {selected.description}
          <hr />
        </div>
      );
    }
    if (selected.itinerary) {
      buffer.push(
        <div className="experience-topic">
          <h4>O que faremos?</h4>
          {selected.itinerary}
          <hr />
        </div>
      );
    }
    if (selected.observation) {
      buffer.push(
        <div className="experience-topic">
          <h4>Informações Adicionais</h4>
          {selected.observation}
          <hr />
        </div>
      );
    }
    if (selected.about_transfer) {
      buffer.push(
        <div className="experience-topic">
          <h4>Sobre o Transfer</h4>
          {selected.about_transfer}
          <hr />
        </div>
      );
    }
    if (selected.about_booking) {
      buffer.push(
        <div className="experience-topic">
          <h4>Seu Agendamento</h4>
          {selected.observation}
          <hr />
        </div>
      );
    }
    if (selected.about_location) {
      buffer.push(
        <div className="experience-topic">
          <h4>Sobre a Localização</h4>
          {selected.about_location}
          <hr />
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
      <div class="card card-booking">
        <div class="content-wrap">
          <div class="pb16">
            <span class="price">{selected.price}</span>
            <span>por pessoa</span>
          </div>
          <button className="btn btn-primary w-100">Agendar</button>
        </div>
      </div>
    )
  }
  render() {
    const { selected, isLoading } = this.props.experience;
    console.log(selected);
    if (isLoading) return <div>Loading</div>
    return (
      <div id="Show" className="container">
        <div className="row">
          <div className="col-sm-8 pb16">
            {this.renderImages(selected)}
            <div>
              <h2><strong>{selected.name}</strong></h2>
            </div>
            <hr />
            {this.renderTopics(selected)}
          </div>
          <div class="col-sm-4 col-xs-12 sidebar">
            {this.renderBookingCard(selected)}
          </div>
        </div>
      </div>
    )
  }
}