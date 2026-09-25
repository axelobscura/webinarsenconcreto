"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoaderImcyc from './LoaderImcyc';
import { StickyHeading } from './Bauhaus';
import Player from './Player';
import { BsChevronLeft } from 'react-icons/bs';

// Mismo slug que se usa en /lideres-de-la-construccion para armar el enlace
const slug = (nombre: string) => nombre.toLowerCase().replaceAll('.','').replaceAll(' ', '-');

export default function Lider({ lider } : {lider: string}) {
  const [useLider, setLider] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/getlideres');
      const apiData = await res.json();
      const buscado = decodeURIComponent(lider);
      setLider(apiData.results.find((item: any) => slug(item.nombre) === buscado) ?? null);
      setCargando(false);
    }
    fetchData();
  }, [lider]);

  if(cargando){
    return(
      <LoaderImcyc />
    )
  };

  if(!useLider){
    return (
      <div className='min-h-screen w-full bg-paper text-ink pt-[72px] px-5 sm:px-10'>
        <p className='pt-10 font-bold uppercase'>Líder no encontrado</p>
        <Link href='/lideres-de-la-construccion' className='inline-flex items-center gap-2 mt-4 underline'>
          <BsChevronLeft/> Regresar
        </Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow='Líderes de la Construcción' titulo={useLider.nombre} />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <Link href='/lideres-de-la-construccion' className='inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase'>
          <BsChevronLeft/> Regresar
        </Link>
        <div className='grid items-start w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]'>
          <div className='flex flex-col gap-6'>
            <div className='overflow-hidden border border-ink rounded-md shadow-hard'>
              <Image
                src={`https://www.webinarsenconcreto.com/images/lideres/${useLider.foto}`}
                alt={useLider.nombre}
                width={400}
                height={400}
                className='object-cover w-full'
              />
            </div>
            {useLider.resumen && (
              <div className='text-sm leading-relaxed [&_p]:mb-3 [&_a]:underline [&_strong]:font-bold [&_b]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5' dangerouslySetInnerHTML={{ __html: useLider.resumen }} />
            )}
          </div>
          <Player codigo={useLider.video} />
        </div>
      </div>
    </div>
  )
}
