"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';
import LoaderImcyc from '../../components/LoaderImcyc';
import { StickyHeading, acento } from '../../components/Bauhaus';
import { congresos } from '../../data/congresos';

export default function Congreso({ params } : { params: { congreso: string } }) {
  const congreso = congresos.find((item) => item.slug === decodeURIComponent(params.congreso));
  const [useDocumentos, setDocumentos] = useState<any[] | null>(null);

  useEffect(() => {
    if(!congreso) return;
    async function fetchData() {
      const res = await fetch(`/api/getencuentro/${congreso!.ano}`);
      const apiData = await res.json();
      setDocumentos(apiData.results ?? []);
    }
    fetchData();
  }, [congreso]);

  if(!congreso){
    return (
      <div className='min-h-screen w-full bg-paper text-ink pt-[72px] px-5 sm:px-10'>
        <p className='pt-10 font-bold uppercase'>Congreso no encontrado</p>
        <Link href='/congresos' className='inline-flex items-center gap-2 mt-4 underline'>
          <BsChevronLeft/> Regresar
        </Link>
      </div>
    )
  }

  if(!useDocumentos){
    return(
      <LoaderImcyc />
    )
  };

  const archivo = (nombre: string) =>{
    if(congreso.slug === '1er-encuentro-del-cemento-y-concreto'){
      return `https://www.webinarsenconcreto.com/imcyc/eventos/encuentro/${encodeURIComponent(nombre)}`;
    } else if(congreso.slug === '2do-encuentro-del-cemento-y-concreto'){
      return `https://www.webinarsenconcreto.com/imcyc/eventos/encuentrodos/${encodeURIComponent(nombre)}`;
    } else {
      return `https://www.webinarsenconcreto.com/imcyc/eventos/encuentro3.jpeg`;
    }
  };

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow={`Encuentros del Cemento y del Concreto · ${congreso.ano}`} titulo={congreso.nombre} />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <Link href='/congresos' className='inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase'>
          <BsChevronLeft/> Regresar
        </Link>
        {useDocumentos.length === 0 ? (
          <p className='font-bold uppercase'>No hay documentos disponibles</p>
        ) : (
          <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
            {useDocumentos.map((item, index) => (
              <a href={archivo(item.documento)} target='_blank' rel='noopener noreferrer' key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
                <div className='aspect-[4/3] overflow-hidden border-b border-ink bg-ink'>
                  {item.imagen && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={archivo(item.imagen)}
                      alt={item.titulo}
                      loading='lazy'
                      className='object-cover object-top w-full h-full transition duration-500 group-hover:grayscale'
                    />
                  )}
                </div>
                <div className='flex items-start flex-1 gap-3 p-4'>
                  <span className={`mt-1 shrink-0 w-3 h-3 rounded-full ${acento(index).bg}`} />
                  <div className='flex flex-col gap-1'>
                    {item.tipo && <span className='text-[11px] font-bold tracking-wider uppercase opacity-60'>{item.tipo}</span>}
                    <h3 className='text-sm font-bold leading-snug uppercase'>{item.titulo}</h3>
                    {item.autor && <p className='text-xs'>{item.autor}</p>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
