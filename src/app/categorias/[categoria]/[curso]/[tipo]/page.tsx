"use client"
import { useState, useEffect } from 'react';
import MenuLateralWebinar from '@/app/components/MenuLateralWebinar';
import { useThemeContext } from '../../../../context/theme'
import LoaderImcyc from '../../../../components/LoaderImcyc'
import Presentacion from '@/app/components/Presentacion';
import Player from '@/app/components/Player';
import Evaluacion from '@/app/components/Evaluacion';

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
  const nombre = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 2]);
  const seccion = decodeCategorySegment(pathname?.split('/')[pathname.split('/').length - 1]);
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
      <div
        className={`flex min-h-screen bg-[url('https://webinars.webinarsenconcreto.com/images/webinars.jpg')] bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <div className='w-full mt-28'>
          <div className='grid grid-cols-1 gap-3 p-3 sm:grid-cols-[1fr_4fr] w-full'>
            <div>
              <MenuLateralWebinar webinar={webinar ? webinar : null} />
            </div>
            <div>
              {seccion === 'presentación-ejecutiva' && <Presentacion />}
              {seccion === 'dato-en-concreto' && <Presentacion />}
              {seccion === 'infografías' && <Presentacion />}
              {seccion === 'videos' && <Player />}
              {seccion === 'evaluación-diagnóstico' && <Evaluacion categoria={nombre} />}
              {seccion === 'evaluación-final' && <Evaluacion categoria={nombre} />}
              {/*categoria === ' PRESENTACIÓN EJECUTIVA' && <Documento lanorma={lanorma} />}
              {categoria === ' PRESENTACIÓN GRABADA' && <Player/>}
              {categoria === ' EVALUACIÓN FINAL' && <Evaluacion categoria={nombre}/>}
              {categoria === ' CONTENIDO ADICIONAL' && <Contenido categoria={nombre}/>} */}
            </div>
          </div>
        </div>
    </div>
    
  )
}
