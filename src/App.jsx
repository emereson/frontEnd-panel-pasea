import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtecteRoutes';
import 'react-toastify/dist/ReactToastify.css';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';
import Header from './pages/Header';
import Register from './pages/Register';
import VerificateCode from './pages/VerificateCode';
import Home from './pages/Home';
import MainMenu from './pages/MainMenu';
import MainMenuHeader from './pages/MainMenuHeader';
import Hotels from './pages/Hotels';
import Login from './pages/Login';
import OneHotel from './pages/OneHotel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './utils/getToken';

function App() {
  const partnerDataJSON = localStorage.getItem('partnerData'); // Obtener la cadena JSON de localStorage
  const partnerData = JSON.parse(partnerDataJSON); // Convertir la cadena JSON a un objeto JavaScript
  const [titleMainMenuHeader, setTitleMainMenuHeader] = useState('');
  const [hotels, setHotels] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/hotel/partner/${
      partnerData?.id
    }`;
    axios
      .get(url, config)
      .then((res) => {
        setHotels(res.data.hotels);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {partnerData && partnerData?.status === 'active' ? (
        <MainMenu />
      ) : (
        <Header />
      )}

      {partnerData && partnerData?.status === 'active' ? (
        <MainMenuHeader titleMainMenuHeader={titleMainMenuHeader} />
      ) : null}

      <Routes>
        <Route path="/log-in" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/verificate-code"
          element={<VerificateCode partnerData={partnerData} />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/hotels"
            element={<Hotels partnerData={partnerData} />}
          />
          <Route
            path="/hotel/:id"
            element={
              <OneHotel
                partnerData={partnerData}
                setTitleMainMenuHeader={setTitleMainMenuHeader}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
