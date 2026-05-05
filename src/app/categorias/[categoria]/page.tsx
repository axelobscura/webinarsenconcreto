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
  const [useFondo, setFondo] = useState<string>('https://webinars.webinarsenconcreto.com/images/contenido.jpg');

  useEffect(() => {
    if (!categoria) {
      return;
    }

    switch (categoria) {
      case 'tilt-up':
        setFondo('/bkgs/tiltup.webp');
        break;
      default:
        setFondo('https://webinars.webinarsenconcreto.com/images/contenido.jpg');
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
        className={`flex justify-center min-h-screen bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat bg-fixed`}
        style={{ 
          background: `url(${useFondo}) fixed center/cover no-repeat`,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] w-full p-10 pt-36'>
          <div>
            <h2 className='font-bold text-left text-white text-[4rem] border-b border-white mb-4 uppercase leading-[3.5rem] py-5'>{categoria?.split('-').join(' ')}</h2>
          </div>
          <div>
            <div className='grid w-full grid-cols-1 gap-3 p-3 sm:grid-cols-3'>
              {webinars.map((webinar) => (
                <Link 
                  href={`/categorias/${categoria}/${webinar.url}/${webinar.modulo ? 'modulos' : 'presentación-ejecutiva'}`}
                  key={webinar.id} 
                  className='grid items-center w-full grid-cols-1 text-center transition duration-300 bg-white rounded-lg shadow-lg bg-opacity-30 hover:bg-opacity-50 hover:text-gray-900 hover:scale-110 hover:bg-black'
                >
                  <Image
                    src={`https://webinars.webinarsenconcreto.com/images/fundamentos/${webinar.imagen}.png` || '/imcyc_registrada.svg'}
                    alt={webinar.nombre}
                    title={webinar.nombre}
                    width={300}
                    height={0}
                    className='rounded-tl-lg rounded-tr-lg'
                    style={{
                      width: "100%"
                    }}
                  />
                  <h3 className='p-3 text-[1.2rem] leading-5 h-28 uppercase font-bold text-white hover:text-white text-center w-full'>{webinar.nombre}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}
