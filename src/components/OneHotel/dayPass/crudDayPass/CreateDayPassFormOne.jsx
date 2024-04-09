import React from 'react';
import { useState } from 'react';

const CreateDayPassFormOne = ({
  setCrud,
  register,
  setSelectedFiles,
  selectedFiles,
  numberForm,
  setNumberForm,
  watch,
}) => {
  const [error, setError] = useState();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) =>
      file.type.startsWith('image/')
    );
    setSelectedFiles(imageFiles);
  };

  const handleOnClickImg = () => {
    document.getElementById('linkImg').click();
  };
  const handleCheckboxChange = (value) => {
    if (stars === value) {
      setStars('');
    } else {
      setStars(value);
    }
  };

  const validInputs = () => {
    const name = watch('name', '');

    let isValid = true;

    if (name.length === 0) {
      setError('Ingrese Un Nombre para su dayPass');
      setNumberForm(1);
      isValid = false;
    }

    if (selectedFiles.length === 0) {
      setError('Por favor carga una imagen para continuar');
      setNumberForm(1);
      isValid = false;
    }

    if (isValid) {
      setNumberForm(2);
    }
  };

  console.log(error);
  return (
    <section
      className="createHotelForm__sectionOne"
      style={{
        transform:
          numberForm === 1 ? 'translateX(0%)' : 'translateX(-120%)',
        height: numberForm === 2 ? '500px' : 'auto',
      }}
    >
      <div className="createHotelForm__div">
        <h4>¿Cómo llamarás a tu Day Pass?</h4>
        <label htmlFor="name">Nombre de Day Pass*</label>
        <input
          {...register('name')}
          id="name"
          type="text"
          placeholder="Denomina a tu Day Pass"
          required
        />
      </div>
      {error && <span>{error}</span>}
      <div className="createHotelForm__div">
        <h4>Dale imagen a tu Day Pass</h4>

        <label htmlFor="linkImg">
          Carga al menos 3 imágenes de tu servicio de Day Pass.
          Recuerda que siempre puedes agregar más imágenes más
          adelante.
        </label>
        <div className="createHotelForm__fileInput">
          <input
            id="linkImg"
            name="linkImg"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            required
            style={{
              opacity: 0,
              position: 'absolute',
              zIndex: -1,
            }}
          />
          {selectedFiles?.length > 0 ? (
            <article
              className="createHotelForm__fileInput__article"
              onClick={handleOnClickImg}
            >
              <img
                className="createHotelForm__fileInput__articleImg"
                src="./icons/imageFont.svg"
              />
              <button className="createHotelForm__fileInput__button">
                {selectedFiles?.length} imagenes Subidas
              </button>
            </article>
          ) : (
            <article
              className="createHotelForm__fileInput__article"
              onClick={handleOnClickImg}
            >
              <img
                className="createHotelForm__fileInput__articleImg"
                src="./icons/imageFont.svg"
              />
              <button className="createHotelForm__fileInput__button">
                <img src="./icons/camera.svg" alt="" />
                CARGAR FOTOS
              </button>
            </article>
          )}
        </div>
      </div>

      <div className="createHotelForm__sectionOne__buttons">
        <button
          type="button"
          onClick={() => {
            setCrud('');
          }}
        >
          REGRESAR
        </button>

        <button
          type="button"
          className="createHotelForm__sectionOne__buttonContinuar"
          onClick={validInputs}
        >
          CREAR DAY PASS
        </button>
      </div>
    </section>
  );
};

export default CreateDayPassFormOne;
