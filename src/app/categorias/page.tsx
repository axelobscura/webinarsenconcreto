"use client"
import { useState, useEffect } from 'react';

export default function Categorias() {
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/categorias');
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

  console.log('CATEGORIAS: ', categorias);

  return (
    <div
        className={`flex justify-center items-center min-h-full bg-[url('https://webinars.webinarsenconcreto.com/images/bkg_contenidos.jpg')] bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat`}
      >
        <div className='grid items-center w-full h-screen grid-cols-1 gap-10 p-10 sm:grid-cols-2'>
          <div>
            <h2 className='text-4xl font-bold text-left text-white'>Contenido IMCYC</h2>
          </div>
          <div>
            <h2 className='text-4xl font-bold text-left text-white'>Valor agregado</h2>
          </div>
        </div>
    </div>
  )
}
