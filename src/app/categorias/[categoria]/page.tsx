"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useThemeContext } from '../../context/theme'
import LoaderImcyc from '../../components/LoaderImcyc'

function decodeCategorySegment(segment?: string) {
  if (!segment) {
    return ''
  }

  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

export default function Categoria() {
  const { pathname } = useThemeContext()
  const categoria = decodeCategorySegment(pathname?.split('/').pop())
  const [categoriaData, setCategoriaData] = useState<any>(null);
  const [webinars, setWebinars] = useState<any[]>([]);

  useEffect(() => {
    if (!categoria) {
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(`/api/getcontenido/${encodeURIComponent(categoria)}`);
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
    return <LoaderImcyc />
  };

  return (
    <div
        className={`flex justify-center items-center bg-[url('https://webinars.webinarsenconcreto.com/images/bkg_contenidos.jpg')] bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] w-full p-10 pt-36'>
          <div className='flex flex-col w-fullp-10'>
            
            <h2 className='font-bold text-left text-white text-[3rem] border-b border-white mb-4 uppercase leading-10 py-5'>{categoria?.split('-').join(' ')}</h2>
          </div>
          <div className='grid w-full grid-cols-1 gap-3 p-3 sm:grid-cols-3'>
            {webinars.map((webinar) => (
              <Link href={`/categorias/${categoria}/${webinar.url}`} key={webinar.id} className='grid items-center justify-between w-full grid-cols-1 text-center transition bg-white rounded-lg shadow-lg bg-opacity-30 hover:bg-opacity-50 hover:text-gray-900'>
                <Image
                  src={`https://webinars.webinarsenconcreto.com/images/fundamentos/${webinar.imagen}.png` || '/imcyc_registrada.svg'}
                  alt={webinar.nombre}
                  title={webinar.nombre}
                  width={300}
                  height={200}
                  className='object-cover rounded-tl-lg rounded-tr-lg'
                  style={{
                    width: "100%"
                  }}
                />
                <h3 className='flex items-center justify-center p-3 text-[1.2rem] leading-5 min-h-28 uppercase font-bold text-white hover:text-gray-950 text-center w-full'>{webinar.nombre}</h3>
              </Link>
            ))}
          </div>
        </div>
    </div>
  )
}
