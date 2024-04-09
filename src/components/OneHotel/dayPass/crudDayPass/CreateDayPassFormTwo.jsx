import React, { useEffect, useState } from 'react';
import { iconsDayPassServices } from '../../../../assets/iconsDayPassServices';
import SelectOption from '../../../../hooks/SelectOption';
import config from '../../../../utils/getToken';
import axios from 'axios';

const CreateDayPassFormTwo = ({
  register,
  numberForm,
  setNumberForm,
  setCategory,
  category,
  listSelectServices,
  setListSelectServices,
  setselectRoom,
  selectRoom,
  partnerData,
  dataHotel,
  priceDays,
  setpriceDays,
  priceSatuyday,
  setpriceSatuyday,
}) => {
  const [transformStyle, setTransformStyle] = useState(
    'translateX(150%)'
  );

  const [allRooms, setAllRooms] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/room/partner/${
      partnerData?.id
    }/hotel/${dataHotel?.id}`;

    axios
      .get(url, config)
      .then((res) => {
        setAllRooms(res.data.rooms);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTransformStyle(
        numberForm === 2 ? 'translateX(-100%)' : 'translateX(150%)'
      );
    }, 100);

    return () => clearTimeout(timeoutId); // Limpiar el temporizador al desmontar el componente
  }, [numberForm]);

  const handleCheckboxChange = (value) => {
    if (category === value) {
      setCategory('');
    } else {
      setCategory(value);
    }
  };

  const handleIconClick = (selectedIcon) => {
    setListSelectServices((prevList) => {
      const iconIndex = prevList.findIndex(
        (icon) => icon.name === selectedIcon.name
      );

      if (iconIndex !== -1) {
        return prevList.map((icon, index) => {
          if (index === iconIndex) {
            return {
              ...icon,
              status: icon.status === 'active' ? 'false' : 'active',
            };
          }
          return icon;
        });
      } else {
        return [...prevList, { ...selectedIcon, status: 'active' }];
      }
    });
  };

  const selectRoomSpan = 'Escoge el tipo de habitación ';

  const handlePriceDaysChange = (event) => {
    const value = event.target.value;
    // Verificar si el valor ingresado es un número
    if (!isNaN(value)) {
      // Si es un número, actualizar el estado
      setpriceDays(value);
    }
  };

  const handlePriceSaturdayDaysChange = (event) => {
    const value = event.target.value;
    // Verificar si el valor ingresado es un número
    if (!isNaN(value)) {
      // Si es un número, actualizar el estado
      setpriceSatuyday(value);
    }
  };

  console.log(selectRoom);

  return (
    <section
      className="createHotelForm__sectionOne"
      style={{
        transform: transformStyle,
        display: numberForm === 2 ? 'flex' : 'none',
      }}
    >
      <div className="createHotelForm__div">
        <h4>Añade un nombre variable a tu Day Pass</h4>
        <label htmlFor="namePackage">Nombre del Paquete*</label>
        <input
          {...register('namePackage')}
          id="namePackage"
          type="text"
          placeholder="Denomina a tu Paquete"
          required
        />
      </div>
      <div className="createHotelForm__div">
        <h4>Selecciona el tipo de Habitación</h4>
        <SelectOption
          span={selectRoomSpan}
          opntionPlusData={allRooms}
          selectOption={selectRoom}
          setSelectOption={setselectRoom}
        />
      </div>

      <div className="createHotelForm__div ">
        <h4>¿Qué servicios incluye?</h4>
        <div className="CreateDayPassFormTwo__iconsServices">
          {listSelectServices?.map((icon) => (
            <div
              key={icon.name}
              onClick={() => handleIconClick(icon)}
            >
              <span
                className={`checkbox  CreateDayPassFormTwo__checkbox ${
                  icon.status === 'active'
                    ? 'CreateDayPassFormTwo__checked'
                    : ''
                }`}
              />
              <img
                src={`./iconsServicesDayPass/${icon.IconSvg}`}
                alt=""
              />
              {icon.name}
            </div>
          ))}
        </div>
      </div>
      <div className="createHotelForm__div">
        <h4>Añade los horarios de disponibilidad</h4>
        <section className="CreateDayPassFormTwo__inputsTimetable">
          <div>
            <label>Horario 1 *</label>
            <article>
              <input
                {...register('startTimetable1')}
                id="startTimetable1"
                type="time"
                placeholder="Denomina a tu Paquete"
                defaultValue="00:00"
                required
              />
              -
              <input
                {...register('endTimetable1')}
                id="endTimetable1"
                type="time"
                defaultValue="00:00"
                required
              />
            </article>
          </div>
          <div>
            <label>Horario 2 *</label>
            <article>
              <input
                {...register('startTimetable2')}
                id="startTimetable2"
                type="time"
                defaultValue="00:00"
                required
              />
              -
              <input
                {...register('endTimetable2')}
                id="endTimetable2"
                type="time"
                defaultValue="00:00"
                required
              />
            </article>
          </div>
          <div>
            <label>Horario 3 *</label>
            <article>
              <input
                {...register('startTimetable3')}
                id="startTimetable3"
                type="time"
                defaultValue="00:00"
                required
              />
              -
              <input
                {...register('endTimetable3')}
                id="endTimetable3"
                type="time"
                defaultValue="00:00"
                required
              />
            </article>
          </div>
        </section>
      </div>
      <div className="createHotelForm__div">
        <h4>Especifica el precio</h4>
        <section className="CreateDayPassFormTwo__prices">
          <div>
            <label htmlFor="priceDays">Domingos a Viernes *</label>
            <input
              {...register('priceDays')}
              id="priceDays"
              type="text"
              placeholder="$USD"
              value={priceDays}
              onChange={handlePriceDaysChange}
              required
            />
          </div>
          <div>
            <label htmlFor="priceSatuyday">Sábados *</label>
            <input
              {...register('priceSatuyday')}
              id="priceSatuyday"
              type="text"
              placeholder="$USD"
              value={priceSatuyday}
              onChange={handlePriceSaturdayDaysChange}
              required
            />
          </div>
        </section>
      </div>

      <div className="createHotelForm__sectionOne__buttons">
        <button
          type="button"
          onClick={() => {
            setNumberForm(1);
          }}
        >
          REGRESAR
        </button>

        <button
          type="submit"
          className="createHotelForm__sectionOne__buttonContinuar"
        >
          CREAR HOTEL
        </button>
      </div>
    </section>
  );
};

export default CreateDayPassFormTwo;
