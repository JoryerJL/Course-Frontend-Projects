// src/Planeta.jsx
import React, { useEffect } from 'react';

function Planeta({ nombre }) {
  useEffect(() => {
    console.log(`¡El planeta ${nombre} ha aparecido!`);

    return () => {
      console.log(`¡El planeta ${nombre} ha desaparecido!`);
    };
  }, []);

  return <div>{nombre}</div>;
}

export default Planeta;
