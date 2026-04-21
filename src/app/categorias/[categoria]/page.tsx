"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useThemeContext } from '../../context/theme'

export default function Categoria() {
  const { pathname } = useThemeContext()
  const categoria = pathname?.split('/').pop()
  const [categoriaData, setCategoriaData] = useState<any>(null);
  const [webinars, setWebinars] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/getcontenido/${categoria}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setWebinars(data.webinars);
        setCategoriaData(data.categoria);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [categoria]);

  if(!categoriaData){
    return(
      <h2>Cargando...</h2>
    )
  };

  return (
    <div
        className={`flex justify-center items-center min-h-screen bg-[url('https://webinars.webinarsenconcreto.com/images/bkg_contenidos.jpg')] bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] w-full p-10 pt-36'>
          <div className='flex flex-col w-fullp-10'>
            <h2 className='font-bold text-left text-white text-[3rem] border-b border-white mb-4 uppercase leading-10 py-5'>{categoria?.split('-').join(' ')}</h2>
          </div>
          <div className='grid w-full grid-cols-1 gap-3 p-3 sm:grid-cols-3'>
            {webinars.map((webinar) => (
              <Link href={`/contenido/${webinar.url}`} key={webinar.id} className='flex flex-col items-center justify-center w-full p-1 text-center transition bg-white border border-white rounded-lg shadow-lg bg-opacity-20 hover:bg-opacity-50 hover:text-gray-900'>
                <Image
                  src={`https://webinars.webinarsenconcreto.com/images/fundamentos/${webinar.imagen}.png` || '/imcyc_registrada.svg'}
                  alt={webinar.nombre}
                  width={300}
                  height={200}
                  className='object-cover rounded-tl-lg rounded-tr-lg'
                />
                <h3 className='text-2xl font-bold text-white hover:text-gray-950'>{webinar.nombre}</h3>
              </Link>
            ))}
          </div>
        </div>
    </div>
  )
}
