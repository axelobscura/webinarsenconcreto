"use client"
import { useState, useEffect } from 'react';
import LoaderImcyc from '../components/LoaderImcyc';
import Image from 'next/image';
import { StickyHeading, acento } from '../components/Bauhaus';

export default function JournalDeLaConstruccion() {
  const [useJournal, setJournal] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/getjournal');
      const apiData = await res.json();
      setJournal(apiData.results);
    }
    fetchData();
  }, []);

  if(!useJournal || useJournal.length === 0){
    return(
      <LoaderImcyc />
    )
  };

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow='Valor agregado' titulo='Investigación y Desarrollo' />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5'>
          {useJournal && useJournal.map((item, index) => (
            <div key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
              <Image
                src={`https://webinarsenconcreto.com/imcyc/journal/${item.imagen}`}
                alt={item.nombre}
                width={400}
                height={400}
                className='object-cover w-full transition duration-500 border-b-[3px] border-ink group-hover:grayscale'
              />
              <div className='flex items-start flex-1 gap-3 p-4'>
                <span className={`mt-1 shrink-0 w-3 h-3 ${acento(index).bg}`} />
                <h3 className='text-sm font-bold leading-snug uppercase'>{item.articulos}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
