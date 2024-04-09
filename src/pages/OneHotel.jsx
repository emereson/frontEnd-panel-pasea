import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../utils/getToken';
import './pagesStyle/OneHotel.css';
import DataHotel from '../components/OneHotel/DataHotel';
import HeaderOneHotel from '../components/OneHotel/HeaderOneHotel';
import Room from '../components/OneHotel/room/Room';
import CreateRoom from '../components/OneHotel/room/CreateRoom';
import DayPass from '../components/OneHotel/dayPass/DayPass';
import CreateDayPass from '../components/OneHotel/dayPass/crudDayPass/CreateDayPass';

const OneHotel = ({ partnerData, setTitleMainMenuHeader }) => {
  const { id } = useParams();
  const [dataHotel, setDataHotel] = useState();
  const [crud, setCrud] = useState();
  const [selectNav, setSelectNav] = useState('rooms');
  const [viewContainer, setViewContainer] = useState('all');

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/hotel/partner/${
      partnerData.id
    }/hotel/${id}`;

    axios
      .get(url, config)
      .then((res) => {
        setDataHotel(res.data.hotel),
          setTitleMainMenuHeader(`${res?.data.hotel.name}`);
      })
      .catch((err) => console.log(err));
  }, [viewContainer, crud]);

  return (
    <div className="OneHotel__container">
      {viewContainer === 'all' && (
        <>
          <DataHotel
            dataHotel={dataHotel}
            setCrud={setCrud}
            crud={crud}
          />

          <section className="oneHotel__sectionOne">
            <h2>Gestiona tus Servicios Hoteleros</h2>
            <p>
              Añade, edita y gestiona tus Alojamientos y Day Pass.
            </p>
          </section>

          <HeaderOneHotel
            setSelectNav={setSelectNav}
            selectNav={selectNav}
            dataHotel={dataHotel}
          />
          {selectNav === 'dayPass' && (
            <DayPass
              setViewContainer={setViewContainer}
              viewContainer={viewContainer}
              dataHotel={dataHotel}
              partnerData={partnerData}
            />
          )}
          {selectNav === 'rooms' && (
            <Room
              dataHotel={dataHotel}
              partnerData={partnerData}
              setViewContainer={setViewContainer}
              viewContainer={viewContainer}
            />
          )}
        </>
      )}
      {viewContainer === 'createRoom' && (
        <CreateRoom
          setViewContainer={setViewContainer}
          partnerData={partnerData}
          dataHotel={dataHotel}
        />
      )}
      {viewContainer === 'createDayPass' && (
        <CreateDayPass
          setViewContainer={setViewContainer}
          setSelectNav={setSelectNav}
          dataHotel={dataHotel}
          partnerData={partnerData}
        />
      )}
    </div>
  );
};

export default OneHotel;
