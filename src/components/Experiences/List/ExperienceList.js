import React from "react";
import ExperienceCard from "./ExperienceCard";
import './ExperienceList.css';

const ExperienceList = (props) => {

  const experienceItems = props.collection.map((experience) => {
    return <ExperienceCard key={experience.id} experience={experience} />
  });

  return (
    <div className="list-cards">
      <h3 className="list-title">Experiências em Maceió</h3>
      <ul>
        {experienceItems}
      </ul>
    </div>
  );
}

export default ExperienceList;
