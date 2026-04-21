"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Categorias() {
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/categorias_b');
      const apiData = await res.json();
      setCategorias(apiData);
    }
    fetchData();
  }, []);

  if(!categorias){
    return(
      <h2>Cargando...</h2>
    )
  };

  return (
    <div
        className={`flex justify-center items-center min-h-full bg-[url('https://webinars.webinarsenconcreto.com/images/bkg_contenidos.jpg')] bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat`}
      >
        <div className='flex flex-col items-center justify-center w-full h-screen'>
          <div className='grid w-full grid-cols-1 gap-10 p-10 sm:grid-cols-2'>
            <div>
              <h2 className='font-bold text-left text-white text-[3rem] border-b border-white mb-4'>Contenido IMCYC</h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {categorias.map((categoria) => {
                  if (categoria.tipo === 'superior') {
                    return (
                      <Link href={`/categorias/${categoria.url}`} key={categoria.id} className='flex items-center justify-center w-full p-2 text-center transition bg-white border border-white shadow-lg rounded-3xl bg-opacity-20 hover:bg-opacity-50 hover:text-gray-900'>
                        <h3 className='py-2 text-2xl font-bold leading-7 text-white hover:text-gray-950'>{categoria.nombre}</h3>
                      </Link>
                    )
                  }
                })}
              </div>
            </div>
            <div>
              <h2 className='text-[3rem] font-bold text-left text-white border-b border-white mb-4'>Valor agregado</h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {categorias.map((categoria) => {
                  if (categoria.tipo === 'consulta' && categoria.nombre !== 'Inteligencia Artificial') {
                    return (
                      <Link href={`/categorias/${categoria.url}`} key={categoria.id} className='flex items-center justify-center p-2 text-center transition bg-white border-[0.1rem] border-white shadow-lg rounded-3xl bg-opacity-20 hover:bg-opacity-50 hover:text-gray-900'>
                        <h3 className='py-2 text-2xl font-bold leading-7 text-white hover:text-gray-950'>{categoria.nombre}</h3>
                      </Link>
                    )
                  }
                })}
              </div>
            </div>
          </div>
          <div className='grid w-full grid-cols-1 p-10'>
            <div>
              <h2 className='text-[3rem] font-bold text-left text-white border-b border-white mb-4'>Concretón</h2>
              <div className='grid grid-cols-1 gap-4'>
                <Link href={`/categorias/inteligencia-artificial`} className='flex items-center justify-center w-full p-2 text-center transition bg-white border border-white shadow-lg rounded-3xl bg-opacity-20 hover:bg-opacity-50 hover:text-gray-900'>
                  <h3 className='py-2 text-2xl font-bold leading-7 text-white hover:text-gray-950'>Inteligencia Artificial</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
