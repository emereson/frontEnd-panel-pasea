import React from 'react';
import './OneHotelStyle/dataHotel.css';

const DataHotel = ({ dataHotel }) => {
  return (
    <section className="dataHotel__container">
      <img
        src={`${import.meta.env.VITE_URL_IMG}/${
          dataHotel?.principalImage
        }`}
        alt=""
      />
      <article className="dataHotel__articleOne">
        <h1>{dataHotel?.name}</h1>
        <p>{dataHotel?.description}</p>
        <p>
          <b> Ubicación:</b> {dataHotel?.locationName},{' '}
          {dataHotel?.reference}
        </p>
        <a
          href={`https://www.google.com/maps/@${dataHotel?.coordinatesLatitude},${dataHotel?.coordinatesLength},21z`}
          target="_blank"
        >
          ver mapa
        </a>
      </article>
    </section>
  );
};

export default DataHotel;
