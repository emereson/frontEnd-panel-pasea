import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FormSection1 = ({
  watch,
  numberForm,
  setNumberForm,
  register,
}) => {
  const [errorEmail, setErrorEmail] = useState('');
  const [error, setError] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const [viewRepeatPassword, setViewRepeatPassword] = useState(false);

  const verificateExistEmail = () => {
    const email = watch('email');

    const url = `${
      import.meta.env.VITE_URL_API
    }/partner/email?email=${email}`;

    axios
      .get(url)

      .catch((err) => {
        setErrorEmail(err.response.data.message);
        setNumberForm(1);
      });
  };

  const validEmail = () => {
    const email = watch('email');
    if (!email) {
      setErrorEmail('El correo electrónico es obligatorio.');
      setNumberForm(1);
      return;
    } else {
      setErrorEmail();
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setErrorEmail(
        'El formato del correo electrónico no  es inválido.'
      );
      setNumberForm(1);
      return;
    } else {
      setErrorEmail();
    }
  };

  const validPassword = () => {
    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    if (!password) {
      setError('Ingrese una contraseña');
      setNumberForm(1);
      return;
    } else {
      setError();
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setNumberForm(1);
      return;
    } else {
      setError();
    }
  };
  return (
    <section
      className="registerForm__sectionOne"
      style={{
        transform:
          numberForm === 1 ? 'translateX(0%)' : 'translateX(-120%)',
      }}
    >
      <h2>Crea una cuenta</h2>

      <div>
        <label htmlFor="email">
          Correo electrónico<b>*</b>
        </label>
        <input
          {...register('email', { required: true })}
          id="email"
          type="email"
          placeholder="Ingresa tu dirección de correo electrónico"
        />
      </div>
      {errorEmail && <p>{errorEmail}</p>}

      <div>
        <label htmlFor="password">
          Contraseña<b>*</b>
        </label>
        <input
          {...register('password', { required: true })}
          id="password"
          type={viewPassword ? 'text' : 'password'}
          placeholder="Contraseña"
        />
        <img
          src="./icons/eye.svg"
          alt=""
          onClick={() => setViewPassword(!viewPassword)}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">
          Confirma la contraseña<b>*</b>
        </label>
        <input
          {...register('confirmPassword', { required: true })}
          id="confirmPassword"
          type={viewRepeatPassword ? 'text' : 'password'}
          placeholder="Confirma tu contraseña"
        />
        <img
          src="./icons/eye.svg"
          alt=""
          onClick={() => setViewRepeatPassword(!viewRepeatPassword)}
        />
      </div>
      {error && <p>{error}</p>}
      <article className="registerForm__sectionOne__article">
        Al <b>CONTINUAR</b> confirmo que estoy de acuerdo con las
        <a href=""> Políticas de privacidad</a> y{' '}
        <a href="">Términos y condiciones</a> de la aplicación Pasea.
      </article>
      <button
        type="button"
        onClick={() => {
          setNumberForm(2),
            validPassword(),
            validEmail(),
            verificateExistEmail();
        }}
      >
        Continuar
      </button>
    </section>
  );
};

export default FormSection1;
