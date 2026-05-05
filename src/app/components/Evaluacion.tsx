"use client"
import { useState, useEffect } from 'react';
import { useThemeContext } from '../context/theme'
import Contador from './Contador';
import LoaderImcyc from './LoaderImcyc';
import { TfiPencilAlt } from "react-icons/tfi";

function decodeCategorySegment(segment?: string) {
  if (!segment) {
    return ''
  }

  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}


export default function Evaluacion({ categoria } : {categoria: string | null}) {
  const { pathname } = useThemeContext();
  const seccion = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 1]);
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

  useEffect(() => {
    const sum = fields.reduce((total, obj) => total + parseInt(obj.rate), 0);
    setTotal(sum);
  }, [fields]);


  if(!preguntas || preguntas.length === 0 || !respuestas || respuestas.length === 0){
    return(
      <LoaderImcyc />
    )
  }

  const getRespuestas = (id: any) => {
    const pregs = respuestas.filter((val) => val.pregunta_id === id);
    const prex = pregs.map((preta: any) => (
      <div key={preta.id} className="flex items-center mb-1 mr-2">
        <input
          className="mr-2 h-5 w-5 cursor-pointer border border-black bg-black accent-[#55dc40]"
          type="radio"
          name={`pregunta${id}`}
          id={`pregunta${id}`}
          value={preta.correcta}
        />
        <label className="pt-[3px] pl-1 uppercase text-[#f2f2f2]">
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

  return (
      <div>
        <div className='h-auto'>
          <div className='w-full'>
            <h2 className='flex p-5 text-3xl font-bold text-white bg-black bg-opacity-70'><TfiPencilAlt className='mr-3' /> {seccion.split("-").join(" ").toUpperCase()}</h2>
          </div>
        </div>
        <div className='h-auto'>
          <div className='w-full'>
            <Contador />
          </div>
        </div>
        <div>
          <div className='w-full'>
            <div className='m-0 h-full overflow-auto overflow-x-hidden border border-black bg-black/50 p-2.5 text-left shadow-[0_0_10px_#000]'>
              {fields.length >= 1 ? 
                <div>
                  <h2 className='p-0'>RESULTADOS</h2>
                  <h4 className='mb-5 text-white'><b>Total de aciertos: {(total * 5 / 100)*100} %</b></h4>
                </div>
                : 
                <form onSubmit={examen}>
                  {preguntas.map((preg, i) => {
                    if(i <= 49){
                      return (
                        <div key={preg.id} className='p-5 border-b border-gray-700'>
                          <div className='flex items-center h-full mb-3'>
                            <div className='flex w-[90px] max-w-[90px] shrink-0 text-center h-full'>
                              <h2 className='m-5 flex w-[90px] items-center text-4xl justify-center p-0 bg-gray-100 text-gray-900 font-bold rounded-md py-32'>{i + 1}</h2>
                            </div>
                            <div>
                              <div>
                                <h3 className='p-0 m-0 text-3xl text-white'>{preg.pregunta}</h3>
                                <p className='p-0 m-0'><small>NORMA: {preg.norma} - CAPÍTULO: {preg.capitulo}</small></p>
                              </div>
                              <div className='my-[5px]'>
                                <div className='flex flex-col'>
                                  {getRespuestas(preg.id)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })}
                  <div className='h-auto'>
                    <div className='w-full'>
                      <button
                        type="submit"
                        className='mt-0 rounded border border-[#111] bg-[#111] px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-white hover:text-black'
                      >
                        ENVIAR RESPUESTAS
                      </button>
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
