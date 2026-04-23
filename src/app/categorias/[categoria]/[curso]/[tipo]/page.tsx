"use client"
import { useState, useEffect } from 'react';
import MenuLateralWebinar from '@/app/components/MenuLateralWebinar';
import { useThemeContext } from '../../../../context/theme'
import LoaderImcyc from '../../../../components/LoaderImcyc'
import Script from 'next/script';

export default function Tipo() {
  const { pathname } = useThemeContext();
  const nombre = pathname?.split('/')[pathname.split('/').length - 2];
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
              <div className='min-h-screen' style={{'width':'100%','height':'100%','position':'relative'}}>
                <div id="container"></div>
              </div>
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
