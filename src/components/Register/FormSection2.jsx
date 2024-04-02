import React, { useEffect, useState } from 'react';

const FormSection2 = ({
  numberForm,
  setNumberForm,
  register,
  error,
}) => {
  const [transformStyle, setTransformStyle] = useState(
    'translateX(150%)'
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTransformStyle(
        numberForm === 2 ? 'translateX(-100%)' : 'translateX(150%)'
      );
    }, 100);

    return () => clearTimeout(timeoutId); // Limpiar el temporizador al desmontar el componente
  }, [numberForm]);

  function OnlyTexts(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      !(charCode >= 65 && charCode <= 90) && // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32 && // Espacio
      charCode !== 8 // Tecla de retroceso
    ) {
      event.preventDefault();
    }
  }

  function OnlyNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (!(charCode >= 48 && charCode <= 57) && charCode !== 8) {
      // Códigos de teclas para números del 0 al 9 y la tecla de retroceso
      event.preventDefault();
    }
  }

  return (
    <section
      className="registerForm__sectionOne registerForm__sectionTwo"
      style={{
        transform: transformStyle,
        display: numberForm === 2 ? 'flex' : 'none',
      }}
    >
      <h2>Crea una cuenta</h2>

      <div className="registerForm__div">
        <label htmlFor="name">Nombre*</label>
        <input
          {...register('name')}
          id="name"
          type="text"
          onKeyPress={OnlyTexts}
          required
        />
      </div>
      <div className="registerForm__div">
        <label htmlFor="lastName">Apellidos*</label>
        <input
          {...register('lastName')}
          id="lastName"
          type="text"
          onKeyPress={OnlyTexts}
          required
        />
      </div>
      <div className="registerForm__div">
        <label htmlFor="ruc">RUC*</label>
        <input {...register('ruc')} id="ruc" type="text" required />
      </div>
      {error && <p>{error}</p>}

      <div className="registerForm__div">
        <label htmlFor="phoneNumber">Número de teléfono*</label>
        <input
          {...register('phoneNumber')}
          id="phoneNumber"
          type="text"
          required
        />
      </div>
      <article>
        Al <b>crear una cuenta</b>aceptas que estas de acuerdo con las
        <a href=""> Políticas de privacidad</a> y{' '}
        <a href="">Términos y condiciones</a>
      </article>
      <div className="registerForm__sectionTwo__buttons">
        <button type="button" onClick={() => setNumberForm(1)}>
          ATRAS
        </button>
        <button type="submit">CREAR CUENTA</button>
      </div>
    </section>
  );
};

export default FormSection2;
