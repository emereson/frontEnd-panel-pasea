import React, { useEffect, useState } from 'react';
import './roomStyle/YourRooms.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../../utils/getToken';
import TableRoom from './yourRoom/TableRoom';

const YourRooms = ({ setViewContainer, allRooms, setcrud, crud }) => {
  const [selectRoom, setselectRoom] = useState();

  const deleteRoom = () => {
    if (selectRoom) {
      const url = `${import.meta.env.VITE_URL_API}/room/${
        selectRoom.id
      }`;

      axios
        .delete(url, config)
        .then((res) => {
          console.log(res);
          setselectRoom();
          setcrud();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="YourRooms__container">
      <article className="YourRooms__article">
        <h3>Edita y agrega nuevas Habitaciones</h3>
        <button
          type="button"
          onClick={() => setViewContainer('createRoom')}
        >
          AGREGAR HABITACIONES
        </button>
      </article>
      <div className="YourRooms__tableContianer">
        <h4>Tus Habitaciones</h4>
        <TableRoom
          selectRoom={selectRoom}
          setselectRoom={setselectRoom}
          allRooms={allRooms}
          setcrud={setcrud}
        />
      </div>
      {crud === 'deleteRoom' ? (
        <div className="YourRooms__delete">
          <section>
            <p>
              Seguro que quiere eliminar la habitación{' '}
              {selectRoom.typeRoom}
            </p>
            <article>
              <button
                style={{
                  backgroundColor: 'white',
                  color: 'var(--text-color-red)',
                }}
                onClick={() => {
                  setcrud();
                  setselectRoom();
                }}
              >
                Cancelar
              </button>
              <button onClick={deleteRoom}>Eliminar</button>
            </article>
          </section>{' '}
        </div>
      ) : null}
    </div>
  );
};

export default YourRooms;
