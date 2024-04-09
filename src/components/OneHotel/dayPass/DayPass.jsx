import React, { useState } from 'react';
import './dayPassStyle/OneHotelDayPass.css';
import CardDayPass from './CardDayPass';
import CreateDayPass from './crudDayPass/CreateDayPass';
import ThereIsNoDaypass from './ThereIsNoDaypass';

const DayPass = ({
  dataHotel,
  partnerData,
  setViewContainer,
  viewContainer,
}) => {
  return (
    <>
      {dataHotel?.dayPasses?.length > 0 ? (
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
        </section>
      ) : (
        <ThereIsNoDaypass setViewContainer={setViewContainer} />
      )}
    </>
  );
};

export default DayPass;
