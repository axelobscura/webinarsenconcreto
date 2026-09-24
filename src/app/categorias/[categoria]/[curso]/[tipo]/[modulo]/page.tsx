"use client"
import { useState, useEffect } from 'react';
import MenuLateralWebinar from '@/app/components/MenuLateralWebinar';
import { useThemeContext } from '../../../../../context/theme'
import LoaderImcyc from '../../../../../components/LoaderImcyc'
import Presentacion from '@/app/components/Presentacion';
import Player from '@/app/components/Player';
import Evaluacion from '@/app/components/Evaluacion';
import { PageBackground } from '@/app/components/Bauhaus';

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

export default function Modulo() {
  const { pathname } = useThemeContext();
  const modulo = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 1]);
  const nombre = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 3]);
  const seccion = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 2]);
  const [webinar, setWebinar] = useState<any>(null);

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

  if (!webinar) {
    return <LoaderImcyc />;
  }

  return (
      <div className='relative bh-page isolate'>
        <PageBackground src='https://webinars.webinarsenconcreto.com/images/webinars.jpg' />
        <div className='pt-6 bh-container-full'>
          <div className='grid w-full grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]'>
            <div>
              <MenuLateralWebinar webinar={webinar ? webinar : null} modulo={seccion ? seccion : null} />
            </div>
            <div className='w-full'>
                {modulo === 'presentación-ejecutiva' && <Presentacion modulo={seccion} />}
                {modulo === 'dato-en-concreto' && <Presentacion modulo={seccion} />}
                {modulo === 'infografías' && <Presentacion modulo={seccion} />}
                {seccion === 'videos' && <Player />}
                {seccion === 'evaluación-diagnóstico' && <Evaluacion categoria={nombre} />}
                {seccion === 'evaluación-final' && <Evaluacion categoria={nombre} />}
            </div>
          </div>
        </div>
    </div>
    
  )
}
