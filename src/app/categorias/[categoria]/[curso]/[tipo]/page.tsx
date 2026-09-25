"use client"
import { useState, useEffect } from 'react';
import MenuLateralWebinar from '@/app/components/MenuLateralWebinar';
import BotonRegresar from '@/app/components/BotonRegresar';
import { useThemeContext } from '../../../../context/theme'
import LoaderImcyc from '../../../../components/LoaderImcyc'
import Presentacion from '@/app/components/Presentacion';
import Player from '@/app/components/Player';
import Evaluacion from '@/app/components/Evaluacion';
import Link from 'next/link';
import { PageBackground, acento } from '@/app/components/Bauhaus';

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

export default function Tipo() {
  const { pathname } = useThemeContext();
  const categoria = decodeCategorySegment(pathname?.split('/')[2]);
  const modulo = pathname?.split('/').pop()
  const nombre = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 2]);
  const seccion = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 1]);
  const [webinar, setWebinar] = useState<any>(null);
  const [modulos, setModulos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/getwebinar/${nombre}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setWebinar(data.results && data.results.length > 0 ? data.results[0] : null);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [nombre]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/get_modulos/${webinar?.id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setModulos(data.modulos && data.modulos.length > 0 ? data.modulos : []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [webinar, nombre]);

  if (!webinar) {
    return <LoaderImcyc />;
  }

  return (
      <div className='relative bh-page isolate pt-[72px]'>
        <PageBackground src='https://webinars.webinarsenconcreto.com/images/webinars.jpg' />
        <div className='bh-container-full'>
          {/* Fuera de la cuadrícula para que el menú y el contenido empiecen a la misma altura */}
          <BotonRegresar href={`/categorias/${pathname?.split('/')[2]}/`} />
          <div className='grid w-full grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]'>
            <div>
              <MenuLateralWebinar webinar={webinar ? webinar : null} />
            </div>
            <div className='w-full'>
              {modulos.length > 0 && modulo === 'modulos' &&
                <div>
                  <p className='mb-4 bh-eyebrow'><span className='w-3 h-3 bg-navy' /> {modulos.length} módulos</p>
                  <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3'>
                  {modulos.length > 0 && modulos.map((modulo: any, index: number) => {
                    const color = acento(index);
                    return (
                    <Link 
                      href={`/categorias/${categoria}/${nombre}/módulo-${modulo.webinar}/presentación-ejecutiva`}
                      key={`${modulo.webinar ?? modulo.titulo ?? 'modulo'}-${index}`} 
                      className='bh-card-link group grid grid-cols-[88px_1fr] overflow-hidden'
                    >
                      <span className={`flex items-center justify-center text-4xl font-bold border-r border-ink ${color.bg} ${color.text}`}>{index + 1}</span>
                      <span className='flex flex-col justify-center gap-1 p-5'>
                        {modulo.norma && <span className='text-xs font-bold tracking-widest uppercase text-sky' dangerouslySetInnerHTML={{ __html: modulo.norma }} />}
                        <span className='text-lg font-extrabold leading-tight uppercase' dangerouslySetInnerHTML={{ __html: modulo.titulo }} />
                      </span>
                    </Link>
                    )
                  })}
                  </div>
                </div>
              }
              {modulos.length === 0 && <>
                {seccion === 'presentación-ejecutiva' && <Presentacion />}
                {seccion === 'dato-en-concreto' && <Presentacion />}
                {seccion === 'infografías' && <Presentacion />}
                {seccion === 'videos' && <Player idContenido={webinar.id} />}
                {seccion === 'evaluación-diagnóstico' && <Evaluacion categoria={nombre} curso={webinar?.nombre} />}
                {seccion === 'evaluación-final' && <Evaluacion categoria={nombre} curso={webinar?.nombre} />}
                {/*categoria === ' PRESENTACIÓN EJECUTIVA' && <Documento lanorma={lanorma} />}
                {categoria === ' PRESENTACIÓN GRABADA' && <Player/>}
                {categoria === ' EVALUACIÓN FINAL' && <Evaluacion categoria={nombre} curso={webinar?.nombre} />}
                {categoria === ' CONTENIDO ADICIONAL' && <Contenido categoria={nombre}/>} */}
              </>}
            </div>
          </div>
        </div>
    </div>
    
  )
}
