import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ service, onClick }) => {
  return (
    <div 
      className="service-card"
      onClick={onClick}
      style={{ '--card-color': service.color }}
    >
      <div className="card-icon">{service.icon}</div>
      <h3>{service.name}</h3>
      <p>{service.displayName}</p>
    </div>
  );
};

export default ServiceCard;