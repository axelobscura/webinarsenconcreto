"use client"
import { useState, useEffect } from 'react';
import LoaderImcyc from '../components/LoaderImcyc';
import Image from 'next/image';
import { PageHeading, acento } from '../components/Bauhaus';

export default function LideresDeLaConstruccion() {
  const [useConcreton, setConcreton] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/getconcreton');
      const apiData = await res.json();
      setConcreton(apiData.results);
    }
    fetchData();
  }, []);

  if(!useConcreton || useConcreton.length === 0){
    return(
      <LoaderImcyc />
    )
  };

  return (
    <div className='bh-page'>
      <div className='bh-container'>
        <PageHeading eyebrow='Valor agregado' titulo='Concretón' subtitulo='Problemas, causas y soluciones' />
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5'>
          {useConcreton && useConcreton.map((item, index) => (
            <div key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
              <Image
                src={`https://www.webinarsenconcreto.com/imcyc/concreton/2017/${item.imagen}`}
                alt={item.norma}
                width={400}
                height={400}
                className='object-cover w-full transition duration-500 border-b-[3px] border-ink group-hover:grayscale'
              />
              <div className='flex items-start flex-1 gap-3 p-4'>
                <span className={`mt-1 shrink-0 w-3 h-3 ${acento(index).bg}`} />
                <h3 className='text-sm font-bold leading-snug uppercase'>{item.norma}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
