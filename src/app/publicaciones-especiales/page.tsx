"use client"
import { useState, useEffect } from 'react';
import LoaderImcyc from '../components/LoaderImcyc';
import Image from 'next/image';
import { StickyHeading, acento } from '../components/Bauhaus';

const publicaciones = [
  {
    id: 1,
    nombre: 'IT Informes Técnicos',
    foto: 'https://webinarsenconcreto.com/images/publicaciones/image0.jpeg',
  },
  {
    id: 2,
    nombre: 'NE Números Especiales',
    foto: 'https://webinarsenconcreto.com/images/publicaciones/image1.jpeg',
  },
  {
    id: 3,
    nombre: 'S Suplementos',
    foto: 'https://webinarsenconcreto.com/images/publicaciones/image2.jpeg',
  },
];

export default function PublicacionesEspeciales() {

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow='Valor agregado' titulo='Publicaciones Especiales' />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
          {publicaciones && publicaciones.map((item, index) => (
            <div key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
              <Image
                src={item.foto}
                alt={item.foto}
                width={400}
                height={400}
                className='object-cover w-full transition duration-500 border-b border-ink group-hover:grayscale'
              />
              <div className='flex items-start flex-1 gap-3 p-4'>
                <span className={`mt-1 shrink-0 w-3 h-3 rounded-full ${acento(index).bg}`} />
                <h3 className='text-sm font-bold leading-snug uppercase'>{item.nombre}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
