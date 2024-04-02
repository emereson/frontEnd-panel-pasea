import React from 'react';
import './pagesStyle/mainMenuHeader.css';

const MainMenuHeader = () => {
  return (
    <div className="mainMenuHeader__container">
      <section className="mainMenuHeader__sectionOne">
        <p>Resumen</p>
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
