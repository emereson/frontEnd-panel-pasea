import React from 'react';
import './hotelsStyles/cardHotel.css';
import { Link } from 'react-router-dom';

const CardHotel = ({ hotel }) => {
  return (
    <div className="cardHotel__container">
      <article className="cardHotel__articleOne">
        <img
          src={`${import.meta.env.VITE_URL_IMG}/${
            hotel.principalImage
          }`}
          alt=""
        />
        <h3>{hotel.name}</h3>
      </article>
      <article className="cardHotel__articleTwo">
        <p>Ubicación : {hotel.locationName} </p>
        <p>Referencia: {hotel.reference}</p>
        <a
          href={`https://www.google.com/maps/@${hotel.coordinatesLatitude},${hotel.coordinatesLength},21z`}
          target="_blank"
        >
          ver mapa
        </a>
      </article>
      <Link to={`/hotel/${hotel.id}`} className="cardHotel__link">
        Ver Hotel
      </Link>
    </div>
  );
};

export default CardHotel;
