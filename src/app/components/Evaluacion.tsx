"use client"
import { useState, useEffect } from 'react';
import Contador from './Contador';

export default function Evaluacion({ categoria } : {categoria: string | null}) {
  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [total, setTotal] = useState<any>(0);

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
    const pregs = respuestas.filter((val) => val.pregunta_id === id);
    const prex = pregs.map((preta: any) => (
      <div key={preta.id} className="form-check mr-2">
        <input className="form-check-input" type="radio" name={`pregunta${id}`} id={`pregunta${id}`} value={preta.correcta} />
        <label className="form-check-label">
          {preta.respuestas}
        </label>
      </div>
    ));

    return prex
  }

  const examen = (e: any) => {
    e.preventDefault();

    
    const { elements } = e.target;
    const fieldsArray = [];
    for(let i = 1; i <= 50; i++){
      const newField = {
        rate: elements[`pregunta${i}`]['value'],
      };
      fieldsArray.push(newField);
    }
    setFields(fieldsArray);


    // reset the form
    e.target.reset();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    const sum = fields.reduce((total, obj) => total + parseInt(obj.rate), 0);
    setTotal(sum);
    preguntas.sort(function(a, b) {
      return Math.random() - 0.5;
    });
  }, [fields])

  console.log(total);

  return (
      <div className='evaluacion'>
        <div className='row' style={{
          'height':'auto'
        }}>
          <div className='col-12'>
            <Contador />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='preguntas'>
              {fields.length >= 1 ? 
                <div>
                  <h2 className='p-0'>RESULTADOS</h2>
                  <h4><b>Total de aciertos: {(total * 5 / 100)*100} %</b></h4>
                </div>
                : 
                <form onSubmit={examen}>
                  {preguntas.map((preg, i) => {
                    if(i <= 49){
                      return (
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
                      )
                    }
                  })}
                  <div className='row' style={{
                    'height': 'auto'
                  }}>
                    <div className='col-12'>
                      <button type="submit" className='btn' style={{
                        'marginTop': '0'
                      }}>ENVIAR RESPUESTAS</button>
                    </div>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
  )
}
