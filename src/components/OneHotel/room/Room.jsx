import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ThereIsNoRoom from './ThereIsNoRoom';
import './roomStyle/Room.css';
import YourRooms from './YourRooms';
import config from '../../../utils/getToken';
const Room = ({
  setViewContainer,
  dataHotel,
  partnerData,
  viewContainer,
}) => {
  const [selectNavRoom, setselectNavRoom] = useState('rooms');
  const [allRooms, setAllRooms] = useState();
  const [crud, setcrud] = useState('none');

  useEffect(() => {
    if (dataHotel) {
      const url = `${import.meta.env.VITE_URL_API}/room/partner/${
        partnerData?.id
      }/hotel/${dataHotel?.id}`;

      axios
        .get(url, config)
        .then((res) => {
          setAllRooms(res.data.rooms);
        })
        .catch((err) => console.log(err));
    }
  }, [viewContainer, dataHotel, crud]);

  return (
    <div className="Room__container">
      {dataHotel?.rooms.length === 0 ? (
        <ThereIsNoRoom setViewContainer={setViewContainer} />
      ) : (
        <section className="Room__sectionOne">
          <header className="RoomSectionOne__header">
            <ul>
              <li onClick={() => setselectNavRoom('rooms')}>
                Tus Habitaciones
              </li>
              <li onClick={() => setselectNavRoom('dayPass')}>
                Agregar Reserva Day Pass
              </li>
              <li onClick={() => setselectNavRoom('accommodation')}>
                Agregar Reserva Alojamiento
              </li>
            </ul>
            <div>
              <span
                style={
                  selectNavRoom === 'rooms'
                    ? { left: '0' }
                    : selectNavRoom === 'dayPass'
                    ? { left: '33.3%' }
                    : { left: '66.7%' }
                }
              ></span>
            </div>
          </header>
          <YourRooms
            setViewContainer={setViewContainer}
            allRooms={allRooms}
            setcrud={setcrud}
            crud={crud}
          />
        </section>
      )}
    </div>
  );
};

export default Room;
