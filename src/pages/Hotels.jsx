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

  return (
    <div className="hotels__container">
      {!crud ? (
        <section className="hotels__sectionOne">
          <h1>¡Gestiona tus Hoteles con facilidad!</h1>
          <p>
            Explora, edita y añade más establecimientos a tu cartera
            con un solo clic.
          </p>
          <button onClick={() => setCrud('createHotel')}>
            Agregar Hotel
          </button>
        </section>
      ) : null}
      {!crud ? (
        <section className="hotels__sectionTwo">
          {hotels?.map((hotel) => (
            <CardHotel key={hotel.id} hotel={hotel} />
          ))}
        </section>
      ) : null}

      {crud === 'createHotel' ? (
        <CreateHotel
          setCrud={setCrud}
          crud={crud}
          partnerData={partnerData}
        />
      ) : null}
    </div>
  );
};

export default Hotels;
