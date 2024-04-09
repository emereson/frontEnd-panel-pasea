import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import config from '../../../utils/getToken';
import axios from 'axios';
import './crudHotelsStyle/createHotel.css';
import CreateHotelFormOne from './CreateHotelFormOne';
import CreateHotelFormTwo from './CreateHotelFormTwo';
import Load from '../../../hooks/Load';

const CreateHotel = ({ setCrud, crud, partnerData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [stars, setStars] = useState('1');
  const [numberForm, setNumberForm] = useState(1);
  const [loading, setLoading] = useState(false);

  const submit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('stars', stars);
    formData.append('description', data.description);
    formData.append('country', data.country);
    formData.append('city', data.city);
    formData.append('postalCode', data.postalCode);
    formData.append('address', data.address);
    formData.append('coordinatesLatitude', data.coordinatesLatitude);
    formData.append('coordinatesLength', data.coordinatesLength);

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file, index) => {
        formData.append(`linkImg`, file);
      });

      const url = `${import.meta.env.VITE_URL_API}/hotel/partner/${
        partnerData.id
      }`;

      axios
        .post(url, formData, config)
        .then((res) => {
          setLoading(false);
          setSelectedFiles([]);
          reset();
          setCrud('');
        })
        .catch((err) => {
          console.log(err);
          setCrud('');
        });
    }
  };

  return (
    <div className="createHotel__container">
      <section className="createHotel__sectionOne">
        <h2>Agrega tu Hotel</h2>
        <p>
          Asegúrate de proporcionarnos la información correcta para
          que podamos promocionar tus servicios hoteleros de la mejor
          manera posible.
        </p>
      </section>
      <section className="createHotel__sectionTwo">
        <div className="createHotel__sectionTwo__div">
          <span>1</span> <p>Acerca del Hotel</p>
        </div>
        <span className="createHotel__sectionTwo__span"></span>
        <div className="createHotel__sectionTwo__div">
          <span>2</span> <p>Datos de ubicación</p>
        </div>
      </section>
      <h3>Acerca de Tu Hotel</h3>
      {loading ? (
        <Load />
      ) : (
        <form
          className="createHotel__form"
          onSubmit={handleSubmit(submit)}
        >
          <CreateHotelFormOne
            register={register}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            setStars={setStars}
            stars={stars}
            setNumberForm={setNumberForm}
            numberForm={numberForm}
            setCrud={setCrud}
          />
          <CreateHotelFormTwo
            register={register}
            setNumberForm={setNumberForm}
            numberForm={numberForm}
          />
        </form>
      )}
    </div>
  );
};
export default CreateHotel;
