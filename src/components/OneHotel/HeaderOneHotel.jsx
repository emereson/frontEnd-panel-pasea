import React from 'react';
import './OneHotelStyle/HeaderOneHotel.css';

const HeaderOneHotel = ({ setSelectNav, selectNav, dataHotel }) => {
  console.log(selectNav);
  return (
    <header className="HeaderOneHotel__container">
      <button
        onClick={() => setSelectNav('rooms')}
        className={
          selectNav === 'rooms' ? 'HeaderOneHotel__buttonActive' : ''
        }
      >
        Habitaciones
      </button>
      {dataHotel?.rooms.length === 0 ? null : (
        <button
          onClick={() => setSelectNav('dayPass')}
          className={
            selectNav === 'dayPass'
              ? 'HeaderOneHotel__buttonActive'
              : ''
          }
        >
          DayPass
        </button>
      )}
      {dataHotel?.rooms.length === 0 ? null : (
        <button
          onClick={() => setSelectNav('accommodation')}
          className={
            selectNav === 'accommodation'
              ? 'HeaderOneHotel__buttonActive'
              : ''
          }
        >
          Alojamiento
        </button>
      )}
    </header>
  );
};

export default HeaderOneHotel;
