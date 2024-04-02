import React, { useState } from 'react';
import './OneHotelStyle/OneHotelDayPass.css';
import CardDayPass from './dayPass/CardDayPass';
import CreateDayPass from './dayPass/crudDayPass/CreateDayPass';
const OneHotelDayPass = ({ dataHotel, partnerData }) => {
  const [viewContainer, setViewContainer] = useState('dayPass');
  const [crud, setCrud] = useState();

  console.log();
  return (
    <section className="OneHotelDayPass__container">
      <header className="OneHotelDayPass__buttons">
        <button
          onClick={() => setViewContainer('dayPass')}
          className={
            viewContainer === 'dayPass'
              ? 'OneHotelDayPass__buttonActive'
              : null
          }
        >
          <img src="/icons/dayPass.svg" alt="" /> DayPass
        </button>
        <button
          onClick={() => setViewContainer('calendar')}
          className={
            viewContainer === 'calendar'
              ? 'OneHotelDayPass__buttonActive'
              : null
          }
        >
          <img src="/icons/calendar.svg" alt="" /> Calendario
        </button>
        <button
          onClick={() => setViewContainer('reservations')}
          className={
            viewContainer === 'reservations'
              ? 'OneHotelDayPass__buttonActive'
              : null
          }
        >
          Reservas
        </button>
        <button
          onClick={() => setViewContainer('record')}
          className={
            viewContainer === 'record'
              ? 'OneHotelDayPass__buttonActive'
              : null
          }
        >
          Historial
        </button>
      </header>
      {viewContainer === 'dayPass' ? (
        <CardDayPass
          dataHotel={dataHotel}
          setCrud={setCrud}
          crud={crud}
          partnerData={partnerData}
        />
      ) : null}
      <CreateDayPass
        setCrud={setCrud}
        crud={crud}
        dataHotel={dataHotel}
        partnerData={partnerData}
      />
    </section>
  );
};

export default OneHotelDayPass;
