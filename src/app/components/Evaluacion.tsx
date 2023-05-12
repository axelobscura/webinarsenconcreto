"use client"
import { useState, useEffect } from 'react';

export default function Evaluacion({ categoria } : {categoria: string | null}) {

  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/evaluacion_grado');
      const apiData = await res.json();
      setPreguntas(apiData);
    }
    fetchData();
    async function fetchDataRespuestas() {
      const res = await fetch('/api/respuestas_grado');
      const apiData = await res.json();
      setRespuestas(apiData);
    }
    fetchDataRespuestas();
  }, []);

  if(!preguntas){
    return(
      <h2>Cargando...</h2>
    )
  }

  const getRespuestas = (id: any) => {
    console.log(id);
    const pregs = respuestas.filter((val) => val.pregunta_id === id);
    const prex = pregs.map((preta: any) => (
      <div key={preta.id} className="form-check mr-2">
        <input className="form-check-input" type="radio" name={`flexRadioDefault${id}`} id={`flexRadioDefault${id}`} />
        <label className="form-check-label">
          {preta.respuestas}
        </label>
      </div>
    ));

    return prex
  }

  console.log(respuestas);
  return (
      <div className='evaluacion'>
        <div className='row'>
          <div className='col-12'>
            <div className='preguntas'>
              <form>
              {preguntas.map((preg, i) => (
                <div key={preg.id}>
                  <div className='d-flex align-items-center mb-3'>
                    <div className='index-numero'>
                      <h2>{i + 1}</h2>
                    </div>
                    <div>
                      <div>
                        <h3 className='m-0 p-0'>{preg.pregunta}</h3>
                        <p className='m-0 p-0'><small>NORMA: {preg.norma} - CAPÍTULO: {preg.capitulo}</small></p>
                      </div>
                      <div className='respuestas'>
                        <div className='d-flex flex-column'>
                          {getRespuestas(preg.id)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className='row' style={{
                'height': 'auto'
              }}>
                <div className='col-12'>
                  <button className='btn' style={{
                    'marginTop': '0'
                  }}>ENVIAR RESPUESTAS</button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}
