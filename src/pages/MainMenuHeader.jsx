import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './pagesStyle/mainMenuHeader.css';

const MainMenuHeader = ({ titleMainMenuHeader }) => {
  const location = useLocation();
  const [url, setUrl] = useState('/');
  useEffect(() => {
    setUrl(location.pathname);
  }, [location.pathname]);

  console.log(url);

  return (
    <div className="mainMenuHeader__container">
      <section className="mainMenuHeader__sectionOne">
        <p>{titleMainMenuHeader}</p>
        <article className="mainMenuHeader__sectionOne__article">
          <div className="mainMenuHeader__notifications">
            <img src="/icons/notification.svg" alt="" />
            <span>1</span>
          </div>
          <div className="mainMenuHeader__user">
            <img src="/icons/user.svg" alt="" />
            <p>Usuario</p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default MainMenuHeader;
