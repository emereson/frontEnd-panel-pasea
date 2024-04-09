import React from 'react';
import './OneHotelStyle/dataHotel.css';
import ServicesHotel from './ServicesHotel';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const DataHotel = ({ dataHotel, setCrud, crud }) => {
  const options = {
    type: 'loop',
    gap: '1rem',
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
  };

  return (
    <section className="dataHotel__container">
      <h1>{dataHotel?.name}</h1>

      <article className="dataHotel__articleOne">
        <Splide
          className={`dataHotel__articleOne__splide `}
          options={options}
        >
          {dataHotel?.photosHotels?.map((image) => (
            <SplideSlide key={image.id}>
              <img
                src={`${import.meta.env.VITE_URL_IMG}/${
                  image.linkImg
                }`}
                alt=""
              />
            </SplideSlide>
          ))}
        </Splide>
        <div className="dataHotel__articleOne__texts">
          <div className="dataHotel__articleOne__textName">
            <h3>{dataHotel?.name}</h3>
            <div className="cardHotel__texts__stars">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.58058 2.19365L9.68058 4.39365C9.83058 4.6999 10.2306 4.99365 10.5681 5.0499L12.5618 5.38115C13.8368 5.59365 14.1368 6.51865 13.2181 7.43115L11.6681 8.98115C11.4056 9.24365 11.2618 9.7499 11.3431 10.1124L11.7868 12.0312C12.1368 13.5499 11.3306 14.1374 9.98683 13.3437L8.11808 12.2374C7.78058 12.0374 7.22433 12.0374 6.88058 12.2374L5.01183 13.3437C3.67433 14.1374 2.86183 13.5437 3.21183 12.0312L3.65558 10.1124C3.73683 9.7499 3.59308 9.24365 3.33058 8.98115L1.78058 7.43115C0.868083 6.51865 1.16183 5.59365 2.43683 5.38115L4.43058 5.0499C4.76183 4.99365 5.16183 4.6999 5.31183 4.39365L6.41183 2.19365C7.01183 0.999902 7.98683 0.999902 8.58058 2.19365Z"
                  fill="#3D4543"
                />
              </svg>
              <span>{dataHotel?.stars}</span>
            </div>
          </div>
          <p>{dataHotel?.description}</p>
          <p>
            <b> Ubicación:</b> {dataHotel?.address}
          </p>
          <ServicesHotel
            dataHotel={dataHotel}
            setCrud={setCrud}
            crud={crud}
          />
          <a
            href={`https://www.google.com/maps/@${dataHotel?.coordinatesLatitude},${dataHotel?.coordinatesLength},21z`}
            target="_blank"
          >
            ver mapa
          </a>
        </div>
      </article>
    </section>
  );
};

export default DataHotel;
