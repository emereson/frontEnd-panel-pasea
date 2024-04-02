import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../utils/getToken';
import './pagesStyle/OneHotel.css';
import ServicesHotel from '../components/OneHotel/ServicesHotel';
import DataHotel from '../components/OneHotel/DataHotel';
import OneHotelDayPass from '../components/OneHotel/OneHotelDayPass';

const OneHotel = ({ partnerData }) => {
  const { id } = useParams();
  const [dataHotel, setDataHotel] = useState();
  const [crud, setCrud] = useState();
  const [viewDayPass, setViewDayPass] = useState(true);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/hotel/partner/${
      partnerData.id
    }/hotel/${id}`;

    axios
      .get(url, config)
      .then((res) => setDataHotel(res.data.hotel))
      .catch((err) => console.log(err));
  }, [crud]);
  console.log(dataHotel);

  return (
    <div className="OneHotel__container">
      <DataHotel dataHotel={dataHotel} />
      <ServicesHotel
        dataHotel={dataHotel}
        setCrud={setCrud}
        crud={crud}
      />
      <section className="oneHotel__sectionOne">
        <button
          onClick={() => setViewDayPass(true)}
          className={
            viewDayPass ? 'oneHotel__sectionOne__buttonActive' : ''
          }
        >
          DayPass
        </button>
        <button
          onClick={() => setViewDayPass(false)}
          className={
            !viewDayPass ? 'oneHotel__sectionOne__buttonActive' : ''
          }
        >
          Alojamiento
        </button>
      </section>
      {viewDayPass ? (
        <OneHotelDayPass
          dataHotel={dataHotel}
          setCrud={setCrud}
          crud={crud}
          partnerData={partnerData}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default OneHotel;
