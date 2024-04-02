import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './pagesStyle/login.css';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const [viewPassword, setViewPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/partner/login`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        const partnerDataJSON = JSON.stringify(res.data.partner);
        localStorage.setItem('partnerData', partnerDataJSON);
        navigate('/');
        window.location.reload();
      })

      .catch((err) => {
        setEmailError(err.response.data.message);
      });

    reset();
  };

  return (
    <div className="longin__container">
      <h1>
        Inicia sesión para tener <br /> una experiencia inolvidable
      </h1>
      <form className="login__form" onSubmit={handleSubmit(submit)}>
        <div className="login__div">
          <label htmlFor="email">Correo electrónico</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="Ingresa tu dirección de correo electrónico"
            required
          />
        </div>
        {emailError ? <span>{emailError}</span> : null}
        <div className="login__div">
          <label htmlFor="password">Contraseña</label>
          <input
            {...register('password')}
            id="password"
            type={viewPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            required
          />

          <img
            src="./icons/eye.svg"
            alt=""
            onClick={() => setViewPassword(!viewPassword)}
          />
        </div>
        <Link to="/forget-password" className="login__forgetPassword">
          ¿Olvidaste tu contraseña?
        </Link>
        <button type="submit" className="login__submitButton">
          inciar sesión
        </button>
      </form>
      <article className="longin__articleConditions">
        Al iniciar sesión, aceptas que estas de acuerdo con las {''}
        <a href="">Políticas de privacidad </a> y {''}
        <a href="">Términos y condiciones.</a>
      </article>
    </div>
  );
};

export default Login;
