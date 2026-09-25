"use client"
import { useState, useEffect } from 'react';
import { useThemeContext } from '../context/theme'
import Contador from './Contador';
import LoaderImcyc from './LoaderImcyc';
import { TfiPencilAlt } from "react-icons/tfi";
import { acento } from './Bauhaus';

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
      <label key={preta.id} className="flex items-center gap-3 px-4 py-3 border border-ink rounded-md bg-surface cursor-pointer transition hover:bg-mist/30 has-[:checked]:bg-mist">
        <input
          className="w-5 h-5 cursor-pointer accent-[#7C5CFF] shrink-0"
          type="radio"
          name={`pregunta${id}`}
          id={`pregunta${id}`}
          value={preta.correcta}
        />
        <span className="font-medium uppercase">
          {preta.respuestas}
        </span>
      </label>
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
        <div className='flex items-center gap-4 p-6 mb-6 text-white bg-ink'>
          <span className='flex items-center justify-center w-12 h-12 text-2xl bg-gradient-to-r from-cobalt to-navy'><TfiPencilAlt /></span>
          <h2 className='text-3xl font-bold uppercase'>{seccion.split("-").join(" ")}</h2>
        </div>
        <Contador />
        {fields.length >= 1 ?
          <div className='grid grid-cols-1 overflow-hidden bh-card sm:grid-cols-[auto_1fr]'>
            <div className='flex items-center justify-center p-10 text-6xl font-bold text-white bg-navy sm:border-r border-ink'>
              {(total * 5 / 100)*100}%
            </div>
            <div className='flex flex-col justify-center p-8'>
              <p className='mb-2 bh-eyebrow'><span className='w-3 h-3 rounded-full bg-gradient-to-r from-cobalt to-navy' /> Resultados</p>
              <h4 className='text-3xl font-bold uppercase'>Total de aciertos</h4>
            </div>
          </div>
          :
          <form onSubmit={examen} className='flex flex-col gap-8'>
            {preguntas.map((preg, i) => {
              if(i <= 49){
                const color = acento(i);
                return (
                  <div key={preg.id} className='grid grid-cols-1 overflow-hidden bh-card sm:grid-cols-[96px_1fr]'>
                    <div className={`flex items-center justify-center p-4 text-4xl font-bold sm:border-r border-b sm:border-b-0 border-ink ${color.bg} ${color.text}`}>{i + 1}</div>
                    <div className='p-6'>
                      <p className='mb-2 text-xs font-bold tracking-widest uppercase text-ink/50'>Norma: {preg.norma} · Capítulo: {preg.capitulo}</p>
                      <h3 className='mb-5 text-2xl font-bold leading-snug'>{preg.pregunta}</h3>
                      <div className='flex flex-col gap-2'>
                        {getRespuestas(preg.id)}
                      </div>
                    </div>
                  </div>
                )
              }
            })}
            <button type="submit" className='self-start text-white bh-btn bg-gradient-to-r from-cobalt to-navy'>
              Enviar respuestas
            </button>
          </form>
        }
      </div>
  )
}
