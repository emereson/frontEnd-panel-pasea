import React from 'react';

const CreateHotelFormOne = ({
  setCrud,
  register,
  setSelectedFiles,
  selectedFiles,
  setStars,
  stars,
  numberForm,
  setNumberForm,
}) => {
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

  const renderStars = (stars) => {
    const starIcons = [];
    for (let i = 1; i <= stars; i++) {
      starIcons.push(
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.42919 16.6588C4.02665 16.8657 3.57085 16.5042 3.65189 16.0422L4.51619 11.1157L0.847097 7.61915C0.504201 7.29239 0.681701 6.69493 1.14106 6.62967L6.24364 5.90481L8.51877 1.39799C8.72371 0.992011 9.27889 0.992011 9.48384 1.39799L11.759 5.90481L16.8615 6.62967C17.3209 6.69493 17.4984 7.29239 17.1555 7.61915L13.4864 11.1157L14.3507 16.0422C14.4318 16.5042 13.976 16.8657 13.5734 16.6588L9.0013 14.3089L4.42919 16.6588Z"
            fill="#FFC700"
          />
        </svg>
      );
    }
    return starIcons;
  };

  return (
    <section
      className="createHotelForm__sectionOne"
      style={{
        transform:
          numberForm === 1 ? 'translateX(0%)' : 'translateX(-120%)',
        height: numberForm === 2 ? '500px' : '100%',
      }}
    >
      <div className="createHotelForm__div">
        <h4>¿Cómo se llama tu Hotel?</h4>
        <label htmlFor="name">Nombre del Hotel*</label>
        <input
          {...register('name')}
          id="name"
          type="text"
          placeholder="Nombre del hotel"
          required
        />
      </div>
      <div className="createHotelForm__div">
        <h4>¿Cómo es tu Hotel?</h4>

        <label htmlFor="linkImg">
          Carga al menos 3 imágenes de tu Hotel. Recuerda que siempre
          puedes agregar más imágenes más adelante para destacar aún
          más tus instalaciones
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
      <div className="createHotelForm__div">
        <h4>¿Cuántas estrellas tiene tu Hotel?</h4>
        <label
          className="createHotelForm__labelCheckbox"
          onClick={() => handleCheckboxChange('1')}
        >
          <span
            className={`checkbox ${stars === '1' ? 'checked' : ''}`}
          />
          1 estrella {renderStars(1)}
        </label>
        <label
          className="createHotelForm__labelCheckbox"
          onClick={() => handleCheckboxChange('2')}
        >
          <span
            className={`checkbox ${stars === '2' ? 'checked' : ''}`}
          />
          2 estrellas {renderStars(2)}
        </label>
        <label
          className="createHotelForm__labelCheckbox"
          onClick={() => handleCheckboxChange('3')}
        >
          <span
            className={`checkbox ${stars === '3' ? 'checked' : ''}`}
          />
          3 estrellas {renderStars(3)}
        </label>
        <label
          className="createHotelForm__labelCheckbox"
          onClick={() => handleCheckboxChange('4')}
        >
          <span
            className={`checkbox ${stars === '4' ? 'checked' : ''}`}
          />
          4 estrellas {renderStars(4)}
        </label>
        <label
          className="createHotelForm__labelCheckbox"
          onClick={() => handleCheckboxChange('5')}
        >
          <span
            className={`checkbox ${stars === '5' ? 'checked' : ''}`}
          />
          5 estrellas {renderStars(5)}
        </label>
        <label
          className="createHotelForm__labelCheckbox"
          onClick={() => handleCheckboxChange('0')}
        >
          <span
            className={`checkbox ${stars === '0' ? 'checked' : ''}`}
          />
          0 estrellas
        </label>
      </div>

      <div className="createHotelForm__div">
        <h4>¿Cómo describirías a tu Hotel?</h4>
        <textarea
          {...register('description')}
          id="description"
          type="text"
          rows={5}
          placeholder="Escribe una descripción corta acerca de tu hotel"
          required
        />
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
          onClick={() => {
            setNumberForm(2);
          }}
        >
          CONTINUAR
        </button>
      </div>
    </section>
  );
};

export default CreateHotelFormOne;
