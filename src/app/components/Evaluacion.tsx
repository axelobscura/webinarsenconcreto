"use client"
import { useState, useEffect } from 'react';
import { useThemeContext } from '../context/theme'
import Contador from './Contador';
import LoaderImcyc from './LoaderImcyc';
import { TfiPencilAlt } from "react-icons/tfi";
import { BsCheckCircleFill, BsXCircleFill, BsArrowRepeat } from "react-icons/bs";
import { acento } from './Bauhaus';
import FormularioConstancia from './FormularioConstancia';

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

// Devuelve una copia en orden aleatorio (Fisher-Yates), para que cada carga muestre las preguntas en otro orden
function mezclar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Se muestran como máximo 50 preguntas por examen
const MAXIMO_PREGUNTAS = 50;
// Para aprobar hay que superar este porcentaje de respuestas correctas
const PORCENTAJE_APROBATORIO = 80;
// Duración del desvanecimiento del formulario antes de mostrar los resultados (ms)
const DURACION_SALIDA = 300;

// En la base de datos "correcta" vale 1 para la respuesta correcta y 0 para las demás
const esCorrecta = (respuesta: any) => Number(respuesta?.correcta) === 1;

export default function Evaluacion({ categoria, curso } : {categoria: string | null, curso?: string | null}) {
  const { pathname } = useThemeContext();
  const seccion = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 1]);
  const webinar = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 2]);
  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<any[]>([]);
  // Respuesta elegida por pregunta: posición de la pregunta -> posición de la opción elegida
  const [elegidas, setElegidas] = useState<Record<number, number>>({});
  const [fase, setFase] = useState<'respondiendo' | 'saliendo' | 'resultados'>('respondiendo');
  // Cambia en cada intento para reiniciar el contador de tiempo
  const [intento, setIntento] = useState(0);
  const webinarparam = webinar.split("-").join("");
  // Nombre del curso para la constancia; si la página no lo pasa, se arma a partir de la URL
  const nombreCurso = curso || (webinar.charAt(0).toUpperCase() + webinar.slice(1)).split('-').join(' ');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/evaluacion_grado?webinar=${encodeURIComponent(webinarparam)}`);
      const apiData = await res.json();
      setPreguntas(Array.isArray(apiData) ? mezclar(apiData) : []);
    }
    fetchData();
    async function fetchDataRespuestas() {
      const res = await fetch(`/api/respuestas_grado?webinar=${encodeURIComponent(webinarparam)}`);
      const apiData = await res.json();
      setRespuestas(apiData);
    }
    fetchDataRespuestas();
  }, []);

  if(!preguntas || preguntas.length === 0 || !respuestas || respuestas.length === 0){
    return(
      <LoaderImcyc />
    )
  }

  const mostradas = preguntas.slice(0, MAXIMO_PREGUNTAS);
  const opcionesDe = (pregunta: any) => respuestas.filter((r) => String(r.id_pregunta) === String(pregunta.id));

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Primero se desvanece el formulario y después aparecen los resultados
    setFase('saliendo');
    setTimeout(() => {
      setFase('resultados');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, DURACION_SALIDA);
  };

  const reintentar = () => {
    setPreguntas((actuales) => mezclar(actuales));
    setElegidas({});
    setIntento((n) => n + 1);
    setFase('respondiendo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resultado de cada pregunta: la opción elegida (si hubo) y si es correcta
  const calificadas = mostradas.map((pregunta, i) => {
    const opciones = opcionesDe(pregunta);
    const elegida = elegidas[i] !== undefined ? opciones[elegidas[i]] : undefined;
    return { pregunta, elegida, correcta: esCorrecta(elegida) };
  });
  const total = calificadas.length;
  const aciertos = calificadas.filter((c) => c.correcta).length;
  const porcentaje = total > 0 ? (aciertos / total) * 100 : 0;
  const aprobado = porcentaje > PORCENTAJE_APROBATORIO;
  const sinResponder = total - Object.keys(elegidas).length;

  const botonReintentar = (
    <button type='button' onClick={reintentar} className='self-start text-white bh-btn'>
      <BsArrowRepeat className='text-lg' /> Volver a presentar el examen
    </button>
  );

  return (
      <div>
        <div className='flex items-center gap-4 p-6 mb-6 text-white bg-ink'>
          <span className='flex items-center justify-center w-12 h-12 text-2xl bg-gradient-to-r from-cobalt to-navy'><TfiPencilAlt /></span>
          <h2 className='text-3xl font-bold uppercase'>{seccion.split("-").join(" ")}</h2>
        </div>

        {fase === 'resultados' ? (
          <div className='flex flex-col gap-8 motion-safe:animate-bh-aparecer'>
            {/* Resumen: porcentaje, aciertos y si aprobó */}
            <div aria-live='polite' className='grid grid-cols-1 overflow-hidden bh-card sm:grid-cols-[auto_1fr]'>
              <div className={`flex flex-col items-center justify-center gap-1 p-10 text-white ${aprobado ? 'bg-emerald-600' : 'bg-red-600'}`}>
                <span className='text-6xl font-black tabular-nums'>{Math.round(porcentaje)}%</span>
                <span className='text-sm font-bold tracking-widest uppercase text-white/80'>{aciertos} de {total} correctas</span>
              </div>
              <div className='flex flex-col justify-center gap-3 p-8'>
                <p className='bh-eyebrow'><span className='w-4 h-1 bg-gradient-to-r from-cobalt to-navy' /> Resultados</p>
                <h3 className={`flex items-center gap-3 text-3xl font-black uppercase ${aprobado ? 'text-emerald-400' : 'text-red-400'}`}>
                  {aprobado ? <BsCheckCircleFill className='shrink-0' /> : <BsXCircleFill className='shrink-0' />}
                  {aprobado ? '¡Aprobaste el examen!' : 'No aprobaste el examen'}
                </h3>
                <p className='max-w-2xl text-steel'>
                  {aprobado
                    ? `¡Felicidades! Respondiste correctamente ${aciertos} de ${total} preguntas.`
                    : `Respondiste correctamente ${aciertos} de ${total} preguntas. Para aprobar necesitas más del ${PORCENTAJE_APROBATORIO}% de respuestas correctas. Repasa el material y vuelve a presentar el examen.`}
                  {sinResponder > 0 && ` Dejaste ${sinResponder} ${sinResponder === 1 ? 'pregunta' : 'preguntas'} sin responder.`}
                </p>
                {!aprobado && <div className='mt-2'>{botonReintentar}</div>}
              </div>
            </div>

            {aprobado && <FormularioConstancia curso={nombreCurso} />}

            {/* Detalle: cada pregunta con la respuesta elegida en verde (correcta) o rojo (incorrecta) */}
            {calificadas.map(({ pregunta, elegida, correcta }, i) => (
              <div key={`${pregunta.id ?? 'pregunta'}-${i}`} className='grid grid-cols-1 overflow-hidden bh-card sm:grid-cols-[96px_1fr]'>
                <div className={`flex items-center justify-center p-4 text-4xl font-bold text-white ${correcta ? 'bg-emerald-600' : 'bg-red-600'}`}>{i + 1}</div>
                <div className='p-6'>
                  <p className='mb-2 text-xs font-bold tracking-widest uppercase text-ink/50'>Norma: {pregunta.norma} · Capítulo: {pregunta.capitulo}</p>
                  <h3 className='mb-5 text-2xl font-bold leading-snug'>{pregunta.pregunta}</h3>
                  <div className={`flex items-center gap-3 px-4 py-3 border rounded-md ${correcta ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-red-500 bg-red-500/10 text-red-300'}`}>
                    {correcta ? <BsCheckCircleFill className='text-lg shrink-0' /> : <BsXCircleFill className='text-lg shrink-0' />}
                    <span className='font-medium uppercase'>{elegida ? elegida.respuesta : 'Sin responder'}</span>
                    <span className='ml-auto text-xs font-bold tracking-widest uppercase shrink-0'>{correcta ? 'Correcta' : 'Incorrecta'}</span>
                  </div>
                </div>
              </div>
            ))}

            {!aprobado && botonReintentar}
          </div>
        ) : (
          <>
            <Contador key={intento} />
            <form
              onSubmit={enviar}
              className={`flex flex-col gap-8 transition-opacity duration-300 ${fase === 'saliendo' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              {mostradas.map((preg, i) => {
                const color = acento(i);
                return (
                  <div key={`${preg.id ?? 'pregunta'}-${i}`} className='grid grid-cols-1 overflow-hidden bh-card sm:grid-cols-[96px_1fr]'>
                    <div className={`flex items-center justify-center p-4 text-4xl font-bold sm:border-r border-b sm:border-b-0 border-ink ${color.bg} ${color.text}`}>{i + 1}</div>
                    <div className='p-6'>
                      <p className='mb-2 text-xs font-bold tracking-widest uppercase text-ink/50'>Norma: {preg.norma} · Capítulo: {preg.capitulo}</p>
                      <h3 className='mb-5 text-2xl font-bold leading-snug'>{preg.pregunta}</h3>
                      <div className='flex flex-col gap-2'>
                        {opcionesDe(preg).map((opcion: any, j: number) => (
                          <label key={j} className="flex items-center gap-3 px-4 py-3 border border-ink rounded-md bg-surface cursor-pointer transition hover:bg-mist/30 has-[:checked]:bg-mist">
                            <input
                              className="w-5 h-5 cursor-pointer accent-[#1A56DB] shrink-0"
                              type="radio"
                              name={`pregunta-${i}`}
                              checked={elegidas[i] === j}
                              onChange={() => setElegidas((actuales) => ({ ...actuales, [i]: j }))}
                            />
                            <span className="font-medium uppercase">
                              {opcion.respuesta}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
              <button type="submit" disabled={fase === 'saliendo'} className='self-start text-white bh-btn'>
                Enviar respuestas
              </button>
            </form>
          </>
        )}
      </div>
  )
}
