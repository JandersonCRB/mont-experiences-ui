import React from "react";
import './ExperienceCard.scss';
import { Link } from 'react-router';

const ExperienceCard = ({experience}) => {

  return (
    <li className="col-md-3 col-sm-3 col-6">
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
            <div className="price">{experience.price}</div>
          </div>
        </div>
        </Link>
      </div>
    </li>
  );
}

export default ExperienceCard;
