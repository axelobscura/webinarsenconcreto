"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useThemeContext } from '../../context/theme'
import LoaderImcyc from '../../components/LoaderImcyc'
import { PageBackground, StickyHeading, acento } from '../../components/Bauhaus'

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
    <div className='relative isolate min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <PageBackground src={categoria === 'tilt-up' ? '/bkgs/tiltup.webp' : 'https://webinars.webinarsenconcreto.com/images/contenido.jpg'} />
      <StickyHeading
        eyebrow={`Contenido IMCYC · ${webinars.length} cursos`}
        titulo={categoria?.split('-').join(' ')}
      />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {webinars.map((webinar, index) => {
            const color = acento(index);
            return (
              <Link
                href={`/categorias/${categoria}/${webinar.url}/${webinar.modulo ? 'modulos' : 'presentación-ejecutiva'}`}
                key={webinar.id}
                className='flex flex-col overflow-hidden bh-card-link group'
              >
                <div className='relative aspect-video bg-ink border-b border-ink overflow-hidden'>
                  <Image
                    src={`https://webinars.webinarsenconcreto.com/images/fundamentos/${webinar.imagen}.png` || '/imcyc_registrada.svg'}
                    alt={webinar.nombre}
                    title={webinar.nombre}
                    width={300}
                    height={0}
                    className='object-cover h-full transition duration-500 group-hover:grayscale group-hover:scale-105'
                    style={{
                      width: "100%"
                    }}
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full ${color.bg} ${color.text}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className='flex items-center justify-between flex-1 gap-4 p-5'>
                  <h3 className='text-lg font-extrabold leading-tight uppercase'>{webinar.nombre}</h3>
                  <span className={`shrink-0 w-4 h-4 ${color.bg} rounded-full`} aria-hidden />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
