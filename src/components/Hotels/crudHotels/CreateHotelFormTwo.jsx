import React, { useEffect, useState } from 'react';

const CreateHotelFormTwo = ({
  register,
  numberForm,
  setNumberForm,
}) => {
  const [transformStyle, setTransformStyle] = useState(
    'translateX(150%)'
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTransformStyle(
        numberForm === 2 ? 'translateX(-100%)' : 'translateX(150%)'
      );
    }, 100);

    return () => clearTimeout(timeoutId); // Limpiar el temporizador al desmontar el componente
  }, [numberForm]);

  return (
    <section
      className="createHotelForm__sectionOne"
      style={{
        transform: transformStyle,
        display: numberForm === 2 ? 'flex' : 'none',
      }}
    >
      <div className="createHotelForm__div">
        <h4>¿Dónde está ubicado tu Hotel?</h4>
        <label htmlFor="country">País*</label>
        <input
          {...register('country')}
          id="country"
          type="text"
          placeholder="Escribe el país en el que esté tu Hotel"
          required
        />
        <label htmlFor="city">Ciudad *</label>
        <input
          {...register('city')}
          id="city"
          type="text"
          placeholder="Escribe la ciudad en la que se encuentra tu hotel"
          required
        />
        <label htmlFor="postalCode">Código Postal *</label>
        <input
          {...register('postalCode')}
          id="postalCode"
          type="text"
          placeholder="Agrega el código postal"
          required
        />
        <label htmlFor="address">Dirección *</label>
        <input
          {...register('address')}
          id="address"
          type="text"
          placeholder="Escribe la dirección de tu Hotel"
          required
        />
      </div>
      <div className="createHotelForm__div ">
        <h4>Especifica las coordenadas de Google Maps</h4>
        <div className="createHotelForm__divLocation">
          <article>
            <label htmlFor="coordinatesLatitude">Latitud *</label>
            <input
              {...register('coordinatesLatitude')}
              id="coordinatesLatitude"
              type="text"
              placeholder="Escribe la Latitud"
              required
            />
          </article>
          <article>
            <label htmlFor="coordinatesLength">Longitud *</label>
            <input
              {...register('coordinatesLength')}
              id="coordinatesLength"
              type="text"
              placeholder="Escribe la Longitud"
              required
            />
          </article>
        </div>
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

export default CreateHotelFormTwo;
