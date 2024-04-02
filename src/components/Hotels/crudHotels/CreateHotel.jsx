import React from 'react';
import { useForm } from 'react-hook-form';
import config from '../../../utils/getToken';
import ViewSelectImg from '../../../hooks/ViewSelectImg';
import axios from 'axios';

const CreateHotel = ({ setCrud, crud, partnerData }) => {
  const { register, handleSubmit, reset } = useForm();
  const {
    selectedImage,
    selectedFileImg,
    handleImageChange,
    handleOnClickImg,
    deleteSelectImgClick,
  } = ViewSelectImg({ idElementImg: 'linkImg' });

  const submit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('description', data.description);
    formData.append('locationName', data.locationName);
    formData.append('reference', data.reference);
    formData.append('coordinatesLatitude', data.coordinatesLatitude);
    formData.append('coordinatesLength', data.coordinatesLength);

    if (selectedFileImg) {
      formData.append('linkImg', selectedFileImg);

      const url = `${import.meta.env.VITE_URL_API}/hotel/partner/${
        partnerData.id
      }`;

      axios
        .post(url, formData, config)
        .then((res) => {
          setCrud('');
          deleteSelectImgClick();
          reset();
        })
        .catch((err) => {
          console.log(err);
          setCrud('');
          deleteSelectImgClick();
        });
    }
  };

  function soloLetrasYEspacios(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      !(charCode >= 65 && charCode <= 90) && // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32 && // Espacio
      charCode !== 8 // Tecla de retroceso
    ) {
      event.preventDefault();
    }
  }

  return (
    <div
      className={`crud__container  ${
        crud === 'createHotel' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Nuevo Hotel</h3>
        {crud === 'createHotel' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="name">Nombre del Hotel:</label>
              <input
                {...register('name')}
                id="name"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="linkImg">Subir Imagen :</label>
              <div className="custom-file-input">
                <input
                  id="linkImg"
                  type="file"
                  onChange={handleImageChange}
                  required
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    zIndex: -1,
                  }}
                />
                {selectedImage ? null : (
                  <img
                    src="./icons/image.svg"
                    onClick={handleOnClickImg}
                  />
                )}
              </div>
              <div className="image__preview">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    onClick={handleOnClickImg}
                  />
                )}
              </div>
            </div>
            <div className="crud__div">
              <label htmlFor="description">Descripción:</label>
              <textarea
                {...register('description')}
                id="description"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                rows="5"
                cols="50"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="country">Pais:</label>
              <input
                {...register('country')}
                id="country"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="city">Ciudad:</label>
              <input
                {...register('city')}
                id="city"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="locationName">Dirreción Hotel:</label>
              <input
                {...register('locationName')}
                id="locationName"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="reference">Referencia:</label>
              <input
                {...register('reference')}
                id="reference"
                type="text"
                required
              />
            </div>
            <h4>Coordenadas del Hotel</h4>
            <div className="crud__div">
              <label htmlFor="coordinatesLatitude">Latitud:</label>
              <input
                {...register('coordinatesLatitude')}
                id="coordinatesLatitude"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="coordinatesLength">Longitud:</label>
              <input
                {...register('coordinatesLength')}
                id="coordinatesLength"
                type="text"
                required
              />
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button
            onClick={() => {
              deleteSelectImgClick(), setCrud('');
            }}
          >
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Crear Hotel
          </button>
        </section>
      </form>
    </div>
  );
};
export default CreateHotel;
