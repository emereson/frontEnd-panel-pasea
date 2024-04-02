import React, { useRef, useState } from 'react';
import './pagesStyle/verificationCode.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerificateCode = ({ partnerData }) => {
  console.log(partnerData);
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(
    Array(6).fill('')
  );
  const inputsRefs = Array.from({ length: 6 }, () => useRef());

  const handleChange = (index, e) => {
    const { value } = e.target;
    if (isNaN(value)) return; // Solo permitir números
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    // Enfocar el siguiente input si hay un valor y no es el último
    if (value && index < inputsRefs.length - 1) {
      inputsRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.keyCode === 8 && e.target.value === '') {
      // Si se presiona la tecla de retroceso en un input vacío
      if (index > 0) {
        inputsRefs[index - 1].current.focus(); // Mover el foco al input anterior
      }
    }
  };

  const activePartner = () => {
    const codeString = verificationCode.join('');

    if (codeString.length === 6) {
      const url = `${import.meta.env.VITE_URL_API}/partner/active/${
        partnerData?.id
      }`;
      axios
        .post(url, { code: codeString })
        .then((res) => {
          console.log(res);

          const partnerDataJSON = JSON.stringify(res.data.partner);
          localStorage.setItem('partnerData', partnerDataJSON);
          navigate('/');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('El código de verificación debe tener 6 dígitos');
    }
  };

  return (
    <div className="verificationCode__container">
      <section className="verificationCode__sectionOne">
        <h1>Verifica tu cuenta</h1>
        <p>
          Se ha enviado un correo electrónico a la dirección
          <b> {partnerData?.email}</b>, el cual contiene un código de
          verificación de 6 dígitos, por favor ingrésalo.
        </p>
      </section>

      <form
        className="verificationCode__sectionTwo"
        onSubmit={activePartner} // No llames a la función aquí
      >
        <img src="./icons/check.svg" alt="" />
        <div className="verificationCode__inputs">
          {verificationCode.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)} // Manejar el evento keyDown
              ref={inputsRefs[index]}
            />
          ))}
        </div>
        <article className="verificationCode__sectionTwo__article">
          <p>¿No has recibido tu código de verificación?</p>
          <button>REENVIAR</button>
        </article>
        <div className="verificationCode__sectionTwo__buttons">
          <button>Regresar</button>
          <button
            className="verificationCode__sectionTwo__buttonVerificate"
            type="submit"
          >
            Verificar
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificateCode;
