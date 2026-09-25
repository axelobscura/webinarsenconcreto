"use client"
import { useState, useEffect } from 'react';
import LoaderImcyc from '../components/LoaderImcyc';
import Image from 'next/image';
import { StickyHeading, acento } from '../components/Bauhaus';

export default function RevistaCyt() {
  const [useCyt, setCyt] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/getcyt');
      const apiData = await res.json();
      setCyt(apiData.results);
    }
    fetchData();
  }, []);

  if(!useCyt || useCyt.length === 0){
    return(
      <LoaderImcyc />
    )
  };

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow='Valor agregado' titulo='Revista Construcción y Tecnología en Concreto' />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-6'>
          {useCyt && useCyt.map((item, index) => (
            <div key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
              <Image
                src={`https://www.webinarsenconcreto.com/imcyc/cyt/${item.imagen}`}
                alt={item.nombre}
                width={400}
                height={400}
                className='object-cover w-full transition duration-500 border-b border-ink group-hover:grayscale'
              />
              <div className='flex items-start flex-1 gap-3 p-4'>
                <span className={`mt-1 shrink-0 w-3 h-3 rounded-full ${acento(index).bg}`} />
                <h3 className='text-sm font-bold leading-snug uppercase'>{item.portada}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
