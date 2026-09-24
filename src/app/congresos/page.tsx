"use client"
import { useState, useEffect } from 'react';
import LoaderImcyc from '../components/LoaderImcyc';
import Image from 'next/image';
import { StickyHeading, acento } from '../components/Bauhaus';

const congresos = [
  {
    id: 1,
    nombre: '1er Encuentro Del Cemento y Concreto',
    foto: 'https://webinarsenconcreto.com/imcyc/eventos/encuentro.jpg',
  },
  {
    id: 2,
    nombre: '2do Encuentro Del Cemento y Concreto',
    foto: 'https://webinarsenconcreto.com/imcyc/eventos/encuentrodos.jpg',
  },
  {
    id: 3,
    nombre: '3er Encuentro Del Cemento y Concreto',
    foto: 'https://webinarsenconcreto.com/imcyc/eventos/encuentro3.jpeg',
  },
];


export default function LideresDeLaConstruccion() {

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow='Valor agregado' titulo='Encuentros del Cemento y del Concreto' />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
          {congresos && congresos.map((item, index) => (
            <div key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
              <div className='aspect-square overflow-hidden border-b-[3px] border-ink bg-ink'>
                <Image
                  src={item.foto}
                  alt={item.nombre}
                  width={400}
                  height={400}
                  className='object-cover object-top w-full h-full transition duration-500 group-hover:grayscale'
                />
              </div>
              <div className='flex items-start flex-1 gap-3 p-4'>
                <span className={`mt-1 shrink-0 w-3 h-3 ${acento(index).bg}`} />
                <h3 className='text-sm font-bold leading-snug uppercase'>{item.nombre}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
