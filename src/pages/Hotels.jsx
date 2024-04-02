import React, { useEffect, useState } from 'react';
import CreateHotel from '../components/Hotels/crudHotels/CreateHotel';
import axios from 'axios';
import './pagesStyle/hotels.css';
import './pagesStyle/crud.css';
import CardHotel from '../components/Hotels/CardHotel';
import config from '../utils/getToken';

const Hotels = ({ partnerData }) => {
  const [crud, setCrud] = useState('');
  const [hotels, setHotels] = useState();
  const [selectUser, setSelectUser] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/hotel/partner/${
      partnerData.id
    }`;
    axios
      .get(url, config)
      .then((res) => {
        setHotels(res.data.hotels);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud]);
  console.log(hotels);

  return (
    <div className="hotels__container">
      <section className="hotels__sectionOne">
        <h1>Tus Hoteles</h1>
        <button onClick={() => setCrud('createHotel')}>
          Agregar Hotel
        </button>
      </section>
      <section className="hotels__sectionTwo">
        {hotels?.map((hotel) => (
          <CardHotel key={hotel.id} hotel={hotel} />
        ))}
      </section>
      <CreateHotel
        setCrud={setCrud}
        crud={crud}
        partnerData={partnerData}
      />
    </div>
  );
};

export default Hotels;
