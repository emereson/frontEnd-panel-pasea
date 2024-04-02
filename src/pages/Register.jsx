import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './pagesStyle/register.css';
import { useNavigate } from 'react-router-dom';
import FormSection1 from '../components/Register/FormSection1';
import FormSection2 from '../components/Register/FormSection2';
import Load from '../hooks/Load';

const Register = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [numberForm, setNumberForm] = useState(1);
  const [error, setError] = useState(false);

  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoad(true);
    const url = `${import.meta.env.VITE_URL_API}/partner/signup`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        const partnerDataJSON = JSON.stringify(res.data.partner);
        localStorage.setItem('partnerData', partnerDataJSON);
        setLoad(false);
        reset();
        navigate('/verificate-code');
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoad(false);
        console.log(err);
      });
  };

  return (
    <div className="register__container">
      <section className="register__sectionOne">
        <h1>Únete a nuestra comunidad de Partners</h1>
        <p>Y conecta a los amantes de la diversión con tu negocio</p>
      </section>
      {load ? (
        <Load />
      ) : (
        <section className="register__sectionTwo">
          <article className="register__sectionTwo__articleOne">
            <p>Te damos la bienvenida a Pasea.app</p>
            <h2>Únete como Socio</h2>
            <p>
              Llena tus datos para tener una cuenta para registrar y
              gestionar tu servicio.
            </p>
          </article>
          <article className="register__sectionTwo__articleTwo">
            <p
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
            </p>
            <span></span>
            <p
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
            </p>
          </article>
          <form
            className="register__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormSection1
              watch={watch}
              setNumberForm={setNumberForm}
              numberForm={numberForm}
              register={register}
            />
            <FormSection2
              watch={watch}
              setNumberForm={setNumberForm}
              numberForm={numberForm}
              register={register}
              error={error}
            />
          </form>
        </section>
      )}
    </div>
  );
};

export default Register;
