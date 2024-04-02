import React, { useEffect, useState } from 'react';
import './dayPassStyle/OneHotelCardDayPass.css';
import axios from 'axios';
import config from '../../../utils/getToken';
const CardDayPass = ({ dataHotel, setCrud, partnerData, crud }) => {
  const [allDayPass, setAllDayPass] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/dayPass/partner/${
      partnerData?.id
    }/hotel/${dataHotel?.id}`;

    axios
      .get(url, config)
      .then((res) => setAllDayPass(res.data.daysPass))
      .catch((err) => console.log(err));
  }, [crud]);
  console.log(allDayPass);

  return (
    <div className="OneHotelCardDayPass__container">
      <header className="OneHotelCardDayPass__header">
        <h3>Tus Day Pass</h3>
        <button
          type="button"
          onClick={() => setCrud('createDayPass')}
        >
          Agregar DayPass
        </button>
      </header>
      <section>
        {allDayPass?.map((daysPass) => (
          <article key={daysPass.id}></article>
        ))}
      </section>
    </div>
  );
};

export default CardDayPass;
