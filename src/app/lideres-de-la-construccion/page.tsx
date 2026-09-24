"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoaderImcyc from '../components/LoaderImcyc';
import Image from 'next/image';
import { StickyHeading, acento } from '../components/Bauhaus';

export default function LideresDeLaConstruccion() {
  const [useLideres, setLideres] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/getlideres');
      const apiData = await res.json();
      setLideres(apiData.results);
    }
    fetchData();
  }, []);

  if(!useLideres || useLideres.length === 0){
    return(
      <LoaderImcyc />
    )
  };

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow='Valor agregado' titulo='Líderes de la Construcción' />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
          {useLideres && useLideres.map((item, index) => (
            <Link href={`/lideres-de-la-construccion/${item.nombre.toLowerCase().replaceAll('.','').replaceAll(' ', '-')}`} key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
              <Image
                src={`https://www.webinarsenconcreto.com/images/lideres/${item.foto}`}
                alt={item.nombre}
                width={400}
                height={400}
                className='object-cover w-full transition duration-500 border-b-[3px] border-ink group-hover:grayscale'
              />
              <div className='flex items-start flex-1 gap-3 p-4'>
                <span className={`mt-1 shrink-0 w-3 h-3 ${acento(index).bg}`} />
                <h3 className='text-sm font-bold leading-snug uppercase'>{item.nombre}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
