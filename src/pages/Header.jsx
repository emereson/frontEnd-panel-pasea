import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './pagesStyle/header.css';

const Header = () => {
  const location = useLocation();
  const [url, setUrl] = useState('/');

  useEffect(() => {
    setUrl(location.pathname);
  }, [location.pathname]);

  console.log(url);

  return (
    <header className="header__container">
      <div className="headerDiv__container">
        <section className="headerDiv__sectionOne">
          <Link to="/help">
            <img src="/icons/message-question.svg" alt="" />
            <p>Ayuda</p>
          </Link>
        </section>
        <img
          src="/logo.svg"
          alt="logo pasea"
          className="header__logo"
        />
        <section className="headerDiv__sectionTwo">
          <Link>
            <p>¿No tienes una cuenta?</p>
          </Link>
          {url === '/log-in' ? (
            <Link
              className="headerDiv__sectionTwo__btn"
              to="/register"
            >
              REGISTRATE
            </Link>
          ) : (
            <Link className="headerDiv__sectionTwo__btn" to="/log-in">
              INICIA SESION
            </Link>
          )}
        </section>
      </div>
    </header>
  );
};

export default Header;
