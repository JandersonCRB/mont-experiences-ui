import React from "react";
import './ExperienceCard.css';
import { Link } from 'react-router';

import Currency from 'react-currency-formatter';

const ExperienceCard = ({experience}) => {

  return (
    <li className="col-lg-3 col-md-4 col-sm-6 col-6">
      <div className="card-experience">
      <Link to={`experiences/${experience.id}`} style={{ textDecoration: 'none' }}>
        <div className="img-wrap">
          <img className="card-img-top" src={experience.cover_photo_url} alt="" />
        </div>
        <div className="content-wrap">
          <div className="content">
            <div className="category">{experience.category}</div>
            <div className="title-block">
              <div className="title">{experience.name}</div>
            </div>
            <div className="price"><Currency quantity={experience.price} currency='BRL' /></div>
          </div>
        </div>
        </Link>
      </div>
    </li>
  );
}

export default ExperienceCard;
