import React, { useState } from 'react';
import axios from 'axios';
import './roomStyle/CreateRoom.css';
import config from '../../../utils/getToken';
import SelectOption from '../../../hooks/SelectOption';

const CreateRoom = ({ setViewContainer, partnerData, dataHotel }) => {
  const [selectAccommodation, setSelectAccommodation] = useState();
  const [numberRooms, setNumberRooms] = useState(0);
  const [numberBedOne, setNumberBedOne] = useState(0);
  const [numberBedTwo, setNumberBedTwo] = useState(0);
  const [numberBedBig, setNumberBedBig] = useState(0);
  const [numberPeople, setNumberPeople] = useState(0);

  const submit = () => {
    const formData = {
      typeRoom: selectAccommodation,
      numberRooms: numberRooms,
      individualBed: numberBedOne,
      doubleBed: numberBedTwo,
      largeDoubleBed: numberBedBig,
      numberPeoples: numberPeople,
    };

    const url = `${import.meta.env.VITE_URL_API}/room/partner/${
      partnerData?.id
    }/hotel/${dataHotel.id}`;

    axios
      .post(url, formData, config)
      .then((res) => {
        console.log(res);
        setViewContainer('all');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectSpan = 'Escoge el tipo de habitación';
  const options = ['Simple', 'Matrimonial'];

  return (
    <div className="CreateRoom__container">
      <h1>Agrega tus Habitaciones</h1>
      <p>
        Especifica la información necesaria para registrar tus
        habitaciones.
      </p>
      <section className="CreateRoom__form">
        <div className="CreateRoomForm__div">
          <h4 htmlFor="email">¿Qué tipo de habitación tienes?</h4>

          <SelectOption
            span={selectSpan}
            options={options}
            selectOption={selectAccommodation}
            setSelectOption={setSelectAccommodation}
          />
        </div>
        <div className="CreateRoomForm__div">
          <h4 htmlFor="email">
            ¿Cuántas habitaciones de este tipo tienes?
          </h4>
          <div className="CreateRoomForm__counterContainer">
            <button
              type="button"
              onClick={() =>
                setNumberRooms(numberRooms > 1 ? numberRooms - 1 : 0)
              }
            >
              -
            </button>
            <span>{numberRooms}</span>
            <button
              type="button"
              onClick={() => setNumberRooms(numberRooms + 1)}
              style={{ textAlign: 'end' }}
            >
              +
            </button>
          </div>
        </div>
        <div className="CreateRoomForm__div">
          <h4 htmlFor="email">
            ¿Qué tipo de camas hay en esta habitación?
          </h4>
          <div className="CreateRoomForm__divBed">
            <article>
              <img src="./icons/bedOne.svg" alt="" />

              <p>Cama individual</p>
            </article>
            <div className="CreateRoomForm__counterContainer">
              <button
                type="button"
                onClick={() =>
                  setNumberBedOne(
                    numberBedOne > 1 ? numberBedOne - 1 : 0
                  )
                }
              >
                -
              </button>
              <span>{numberBedOne}</span>
              <button
                type="button"
                onClick={() => setNumberBedOne(numberBedOne + 1)}
                style={{ textAlign: 'end' }}
              >
                +
              </button>
            </div>
          </div>
          <div className="CreateRoomForm__divBed">
            <article>
              <img src="./icons/bedTwo.svg" alt="" />

              <p>Cama doble</p>
            </article>
            <div className="CreateRoomForm__counterContainer">
              <button
                type="button"
                onClick={() =>
                  setNumberBedTwo(
                    numberBedTwo > 1 ? numberBedTwo - 1 : 0
                  )
                }
              >
                -
              </button>
              <span>{numberBedTwo}</span>
              <button
                type="button"
                onClick={() => setNumberBedTwo(numberBedTwo + 1)}
                style={{ textAlign: 'end' }}
              >
                +
              </button>
            </div>
          </div>
          <div className="CreateRoomForm__divBed">
            <article>
              <img src="./icons/bedBig.svg" alt="" />

              <p>Cama doble grande</p>
            </article>
            <div className="CreateRoomForm__counterContainer">
              <button
                type="button"
                onClick={() =>
                  setNumberBedBig(
                    numberBedBig > 1 ? numberBedBig - 1 : 0
                  )
                }
              >
                -
              </button>
              <span>{numberBedBig}</span>
              <button
                type="button"
                onClick={() => setNumberBedBig(numberBedBig + 1)}
                style={{ textAlign: 'end' }}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="CreateRoomForm__div">
          <h4 htmlFor="email">
            ¿Cuántas personas pueden alojarse en esta habitación?{' '}
          </h4>
          <div className="CreateRoomForm__counterContainer">
            <button
              type="button"
              onClick={() =>
                setNumberPeople(
                  numberPeople > 1 ? numberPeople - 1 : 0
                )
              }
            >
              -
            </button>
            <span>{numberPeople}</span>
            <button
              type="button"
              onClick={() => setNumberPeople(numberPeople + 1)}
              style={{ textAlign: 'end' }}
            >
              +
            </button>
          </div>
        </div>
        <div className="CreateRoomForm__buttons">
          <button
            type="button"
            onClick={() => setViewContainer('all')}
          >
            CANCELAR
          </button>
          <button type="button" onClick={() => submit()}>
            AÑADIR HABITACIÓN
          </button>
        </div>
      </section>
    </div>
  );
};

export default CreateRoom;
