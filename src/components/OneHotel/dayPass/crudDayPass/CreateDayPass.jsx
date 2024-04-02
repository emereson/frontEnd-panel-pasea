import React from 'react';
import ViewSelectImg from '../../../../hooks/ViewSelectImg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../../../utils/getToken';

const CreateDayPass = ({ dataHotel, setCrud, crud, partnerData }) => {
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
    formData.append('houreStart', data.houreStart);
    formData.append('houreEnd', data.houreEnd);
    formData.append('price', data.price);

    if (selectedFileImg) {
      formData.append('linkImg', selectedFileImg);
    }

    const url = `${import.meta.env.VITE_URL_API}/dayPass/partner/${
      partnerData?.id
    }/hotel/${dataHotel?.id}`;

    axios
      .post(url, formData, config)
      .then((res) => {
        setCrud('');
        deleteSelectImgClick();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
        deleteSelectImgClick();
      });
    reset();
  };

  function OnlyNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (!(charCode >= 48 && charCode <= 57) && charCode !== 8) {
      // Códigos de teclas para números del 0 al 9 y la tecla de retroceso
      event.preventDefault();
    }
  }

  return (
    <div
      className={`crud__container  ${
        crud === 'createDayPass' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Nuevo Day Pass</h3>
        {crud === 'createDayPass' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="name">Nombre:</label>
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
              <label htmlFor="houreStart">Hora de Entrada:</label>
              <input
                {...register('houreStart')}
                id="houreStart"
                type="time"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="houreEnd">Hora de Salida:</label>
              <input
                {...register('houreEnd')}
                id="houreEnd"
                type="time"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="price">Precio por Persona:</label>
              <input
                {...register('price')}
                id="price"
                type="text"
                onKeyPress={OnlyNumbers}
                required
              />
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button
            type="button"
            onClick={() => {
              deleteSelectImgClick(), setCrud('');
            }}
          >
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Crear DayPass
          </button>
        </section>
      </form>
    </div>
  );
};

export default CreateDayPass;
