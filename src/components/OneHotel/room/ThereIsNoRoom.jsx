import React from 'react';
const ThereIsNoRoom = ({ setViewContainer }) => {
  return (
    <section className="ThereIsNoDaypass__container">
      <img src="./icons/thereIsNoDaypass.svg" alt="" />

      <h2>
        Aún no tienes habitaciones <br /> registradas por ahora...
      </h2>
      <p>
        Registra tus Habitaciones para que puedas <br /> crear tus Day
        Pass y Alojamiento.
      </p>
      <button
        type="button"
        onClick={() => setViewContainer('createRoom')}
      >
        COMENZAR
      </button>
    </section>
  );
};

export default ThereIsNoRoom;
