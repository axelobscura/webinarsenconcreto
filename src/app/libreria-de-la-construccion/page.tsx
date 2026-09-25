"use client"
import { useState, useEffect } from 'react';
import LoaderImcyc from '../components/LoaderImcyc';
import Image from 'next/image';
import { StickyHeading, acento } from '../components/Bauhaus';

export default function LibreriaDeLaConstruccion() {
  const [useLibros, setLibros] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/libreria');
      const apiData = await res.json();
      setLibros(apiData.results);
    }
    fetchData();
  }, []);

  if(!useLibros || useLibros.length === 0){
    return(
      <LoaderImcyc />
    )
  };

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow={`Valor agregado · ${useLibros.length} libros`} titulo='Librería de la Construcción' />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {useLibros && useLibros.map((item, index) => (
            <div key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
              <Image
                src={`https://webinars.webinarsenconcreto.com/libros/${item.imagen}.jpg`}
                alt={item.titulo}
                width={400}
                height={400}
                className='object-cover w-full transition duration-500 border-b border-ink group-hover:grayscale'
              />
              <div className='flex items-start flex-1 gap-3 p-4'>
                <span className={`mt-1 shrink-0 w-3 h-3 rounded-full ${acento(index).bg}`} />
                <h3 className='text-sm font-bold leading-snug uppercase'>{item.titulo}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
