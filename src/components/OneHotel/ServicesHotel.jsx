import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../utils/getToken';
import './OneHotelStyle/servicesHotel.css';

const ServicesHotel = ({ dataHotel, setCrud, crud }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (dataHotel?.servicesHotels) {
      setSelectedServices(
        dataHotel.servicesHotels.map((service) => ({
          id: service.id,
          status: service.status,
          name: service.name,
          IconSvg: service.IconSvg,
        }))
      );
    }
  }, [dataHotel]);

  const toggleService = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      return prevSelectedServices.map((service) => {
        if (service.id === serviceId) {
          // Cambiar el estado del servicio
          return {
            ...service,
            status:
              service.status === 'active' ? 'disable' : 'active',
          };
        }
        return service;
      });
    });
  };

  const saveServices = async () => {
    const services = selectedServices.map(async (service) => {
      const url = `${import.meta.env.VITE_URL_API}/hotel/service/${
        service.id
      }`;
      const payload = { status: service.status };

      try {
        await axios.patch(url, payload, config);
      } catch (err) {
        console.error(err);
      }
    });

    try {
      await Promise.all(services);
      setCrud();
    } catch (error) {
      setCrud();
    }
  };

  return (
    <section className="serviceHotel__container">
      <article className="serviceHotel__article">
        <h2>Servicios Disponibles</h2>
        {crud === 'editServices' ? (
          <button
            onClick={() => {
              setCrud('editServices'), saveServices();
            }}
          >
            Guardar Servicios
          </button>
        ) : (
          <button onClick={() => setCrud('editServices')}>
            Editar Servicios
          </button>
        )}
      </article>
      {crud === 'editServices' ? (
        <ul className="serviceHotel__iconsList serviceHotel__iconsListEdit">
          {selectedServices.map((service) => (
            <li key={service.id}>
              <input
                type="checkbox"
                id={`service-${service.id}`}
                checked={service.status === 'active'}
                onChange={() => toggleService(service.id)}
              />
              <label htmlFor={`service-${service.id}`}>
                <img
                  src={`./iconsServicesHotel/${service.IconSvg}`}
                  alt=""
                />
                <p>{service.name}</p>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="serviceHotel__iconsList">
          {dataHotel?.servicesHotels
            ?.filter((service) => service.status === 'active')
            .map((service) => (
              <li key={service.id}>
                <img
                  src={`iconsServicesHotel/${service.IconSvg}`}
                  alt=""
                />
                <p>{service.name}</p>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default ServicesHotel;
