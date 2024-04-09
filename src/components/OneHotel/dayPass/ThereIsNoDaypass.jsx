import React from 'react';
import './dayPassStyle/ThereIsNoDaypass.css';
const ThereIsNoDaypass = ({ setViewContainer }) => {
  return (
    <section className="ThereIsNoDaypass__container">
      <img src="./icons/thereIsNoDaypass.svg" alt="" />

      <h2>
        Aún no tienes registrado <br /> ningún Day Pass por ahora...
      </h2>
      <p>
        ¡Comienza ya! Añade Day Pass para brindar a <br /> tus
        clientes experiencias inolvidables.
      </p>
      <button
        type="button"
        onClick={() => setViewContainer('createDayPass')}
      >
        COMENZAR
      </button>
    </section>
  );
};

export default ThereIsNoDaypass;
