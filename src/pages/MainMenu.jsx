import React from 'react';
import './pagesStyle/mainMenu.css';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className="mainMenu__container">
      <img
        src="/logo.svg"
        alt="logo pasea"
        className="mainMenu__logo"
      />
      <section className="mainMenu__sectionOne">
        <div className="mainMenu__sectionOne__div">
          <article className="mainMenu__sectionOne__article">
            <img src="./icons/hotel.svg" alt="hoteles " />
            <Link to="hotels">Hoteles</Link>
          </article>
          <ul>
            <li>Day pass</li>
            <li>Alojamientos</li>
            <li>Tus clientes</li>
          </ul>
        </div>
        <div className="mainMenu__sectionOne__div">
          <article className="mainMenu__sectionOne__article">
            <img src="./icons/services.svg" alt="hoteles " />
            <p>Hoteles</p>
          </article>
          <ul>
            <li>Day pass</li>
            <li>Alojamientos</li>
            <li>Tus clientes</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MainMenu;
