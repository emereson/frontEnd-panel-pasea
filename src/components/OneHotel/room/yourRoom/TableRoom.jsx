import React, { useEffect, useState } from 'react';
import config from '../../../../utils/getToken';
import axios from 'axios';

const TableRoom = ({
  selectRoom,
  setselectRoom,
  allRooms,
  setcrud,
}) => {
  const [selectAccommodation, setSelectAccommodation] = useState();
  const [viewOptions, setViewOptions] = useState(false);
  const [numberRooms, setnumberRooms] = useState();
  const [individualBed, setindividualBed] = useState();
  const [doubleBed, setdoubleBed] = useState();
  const [numberPeoples, setNumberPeoples] = useState();
  const [largeDoubleBed, setlargeDoubleBed] = useState();

  useEffect(() => {
    if (selectRoom) {
      setnumberRooms(selectRoom.numberRooms || '');
      setindividualBed(selectRoom.individualBed || '');
      setdoubleBed(selectRoom.doubleBed || '');
      setlargeDoubleBed(selectRoom.largeDoubleBed || '');
      setNumberPeoples(selectRoom.numberPeoples || '');
      setSelectAccommodation(selectRoom.typeRoom);
    }
  }, [selectRoom]);

  const onSubmit = () => {
    const formData = {
      typeRoom: selectAccommodation,
      numberRooms: Number(numberRooms),
      individualBed: Number(individualBed),
      doubleBed: Number(doubleBed),
      largeDoubleBed: Number(largeDoubleBed),
      numberPeoples: Number(numberPeoples),
    };

    if (selectRoom) {
      const url = `${import.meta.env.VITE_URL_API}/room/${
        selectRoom.id
      }`;

      axios
        .patch(url, formData, config)
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

  const options = [
    { value: 'Simple', label: 'Simple' },
    { value: 'Matrimonial', label: 'Matrimonial' },
  ];
  return (
    <form>
      <table className="YourRooms__table">
        <thead>
          <tr>
            <th>Habitación</th>
            <th>Cantidad</th>
            <th>Persona Por habitación</th>
            <th>Cama individual</th>
            <th>Cama doble</th>
            <th>Cama doble grande</th>
            <th>Disponibles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allRooms?.map((room) => (
            <tr key={room.id}>
              <td>
                {selectRoom?.id === room.id ? (
                  <article className="CreateRoomForm__selectContianer YourRooms__table__selectContianer">
                    <div
                      className="CreateRoomForm__selectContianer__select YourRooms__table__select"
                      onClick={() => {
                        setViewOptions(!viewOptions);
                      }}
                    >
                      <p>{selectAccommodation} </p>

                      <img src="./icons/arrowBottom.svg" alt="" />
                    </div>
                    {viewOptions ? (
                      <ul>
                        {options.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setSelectAccommodation(option.value);
                              setViewOptions(false);
                            }}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ) : (
                  room.typeRoom
                )}
              </td>
              <td>
                {selectRoom?.id === room.id ? (
                  <input
                    type="number"
                    value={numberRooms}
                    onChange={(e) => setnumberRooms(e.target.value)}
                  />
                ) : (
                  room.numberRooms
                )}
              </td>
              <td>
                {selectRoom?.id === room.id ? (
                  <input
                    key={2}
                    type="number"
                    value={numberPeoples}
                    onChange={(e) => setNumberPeoples(e.target.value)}
                  />
                ) : (
                  room.numberPeoples
                )}
              </td>
              <td>
                {selectRoom?.id === room.id ? (
                  <input
                    type="number"
                    value={individualBed}
                    onChange={(e) => setindividualBed(e.target.value)}
                  />
                ) : (
                  room.individualBed
                )}
              </td>
              <td>
                {selectRoom?.id === room.id ? (
                  <input
                    type="number"
                    value={doubleBed}
                    onChange={(e) => setdoubleBed(e.target.value)}
                  />
                ) : (
                  room.doubleBed
                )}
              </td>
              <td>
                {selectRoom?.id === room.id ? (
                  <input
                    type="number"
                    value={largeDoubleBed}
                    onChange={(e) =>
                      setlargeDoubleBed(e.target.value)
                    }
                  />
                ) : (
                  room.largeDoubleBed
                )}
              </td>

              <td>{room.availableRooms}</td>
              <td className="YourRooms__table__buttons">
                {selectRoom?.id === room.id ? (
                  <button type="button" onClick={() => onSubmit()}>
                    <img src={`./icons/save.svg`} alt="" />
                  </button>
                ) : (
                  <button
                    style={{ cursor: 'pointer' }}
                    type="button"
                    onClick={() => {
                      setcrud('updateRoom');
                      setselectRoom(room);
                    }}
                  >
                    <img src={`./icons/edit.svg`} alt="" />{' '}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setcrud('deleteRoom');
                    setselectRoom(room);
                  }}
                >
                  <img src={`./icons/delete.svg`} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default TableRoom;
