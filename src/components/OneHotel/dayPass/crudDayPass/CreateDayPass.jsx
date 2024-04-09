import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../../../utils/getToken';
import Load from '../../../../hooks/Load';
import CreateDayPassFormOne from './CreateDayPassFormOne';
import CreateDayPassFormTwo from './CreateDayPassFormTwo';
import './crudDayPassStyle/createDayPass.css';
import { iconsDayPassServices } from '../../../../assets/iconsDayPassServices';

const CreateDayPass = ({
  setViewContainer,
  dataHotel,
  setSelectNav,
  partnerData,
}) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberForm, setNumberForm] = useState(1);
  const [category, setCategory] = useState('Familiar');
  const [selectRoom, setselectRoom] = useState();
  const [listSelectServices, setListSelectServices] = useState(
    iconsDayPassServices
  );
  const [priceDays, setpriceDays] = useState();
  const [priceSatuyday, setpriceSatuyday] = useState();

  const submit = (data) => {
    setLoading(true);
    const formData2 = {
      name: data.namePackage,
      typeRoom: selectRoom,
      startTimetable1: data.startTimetable1,
      endTimetable1: data.endTimetable1,
      startTimetable2: data.startTimetable2,
      endTimetable2: data.endTimetable2,
      startTimetable3: data.startTimetable3,
      endTimetable3: data.endTimetable3,
      priceDays: data.priceDays,
      priceSatuyday: data.priceSatuyday,
    };
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('dataPackage', JSON.stringify(formData2));
    formData.append(
      'listServices',
      JSON.stringify(listSelectServices)
    );

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file, index) => {
        formData.append(`linkImg`, file);
      });
      const url = `${import.meta.env.VITE_URL_API}/dayPass/partner/${
        partnerData?.id
      }/hotel/${dataHotel?.id}`;

      axios
        .post(url, formData, config)
        .then((res) => {
          setViewContainer('all');
          setSelectNav('dayPass');
          setLoading(false);
        })
        .catch((err) => {
          setViewContainer('all');
          setSelectNav('dayPass');
        });
    }
  };

  return (
    <div className="createHotel__container">
      <section className="createHotel__sectionOne">
        <h2>Agrega tu Day Pass</h2>
        <p>Convierte tus servicios en Experiencias inolvidables.</p>
      </section>
      <div
        style={{
          backgroundColor: 'white',
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
          gap: '50px',
        }}
      >
        <section className="createHotel__sectionTwo">
          <div className="createHotel__sectionTwo__div">
            <span
              style={
                numberForm === 1
                  ? {
                      color: 'var(--text-color-white)',
                      background: 'var(--text-color-red)',
                    }
                  : null
              }
            >
              1
            </span>{' '}
            <p>Crea tu Day Pass</p>
          </div>
          <span className="createHotel__sectionTwo__span"></span>
          <div className="createHotel__sectionTwo__div">
            <span
              style={
                numberForm === 2
                  ? {
                      color: 'var(--text-color-white)',
                      background: 'var(--text-color-red)',
                    }
                  : null
              }
            >
              2
            </span>{' '}
            <p>Crea tus Paquetes</p>
          </div>
        </section>
        {loading ? (
          <Load />
        ) : (
          <form
            className="createHotel__form"
            onSubmit={handleSubmit(submit)}
          >
            <CreateDayPassFormOne
              register={register}
              setSelectedFiles={setSelectedFiles}
              selectedFiles={selectedFiles}
              setNumberForm={setNumberForm}
              numberForm={numberForm}
              setCrud={setCrud}
              watch={watch}
            />
            <CreateDayPassFormTwo
              register={register}
              setNumberForm={setNumberForm}
              numberForm={numberForm}
              setCategory={setCategory}
              category={category}
              listSelectServices={listSelectServices}
              setListSelectServices={setListSelectServices}
              setselectRoom={setselectRoom}
              selectRoom={selectRoom}
              partnerData={partnerData}
              dataHotel={dataHotel}
              priceDays={priceDays}
              setpriceDays={setpriceDays}
              priceSatuyday={priceSatuyday}
              setpriceSatuyday={setpriceSatuyday}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateDayPass;
