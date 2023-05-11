"use client"
import { useState, useEffect } from 'react';

export default function Evaluacion({ categoria } : {categoria: string | null}) {

  const [preguntas, setPreguntas] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/evaluacion_grado');
      const apiData = await res.json();
      setPreguntas(apiData);
    }
    fetchData();
  }, []);

  if(!preguntas){
    return(
      <h2>Cargando...</h2>
    )
  }

  console.log(preguntas);

  return (
      <div className='evaluacion'>
        <h2>{categoria}</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='preguntas'>
              {preguntas.map((preg, i) => (
                <div key={preg.id}>
                  <div className='d-flex align-items-center'>
                    <h2>{i + 1}</h2>
                    <h3>{preg.pregunta}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}
