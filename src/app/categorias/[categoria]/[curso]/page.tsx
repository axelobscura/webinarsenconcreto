"use client"
import { useState, useEffect } from 'react';
import MenuLateral from '@/app/components/MenuLateral';
import BotonRegresar from '@/app/components/BotonRegresar';
import { useThemeContext } from '../../../context/theme'
import Script from 'next/script';
import { PageBackground } from '@/app/components/Bauhaus';

export default function Curso() {
  const { pathname } = useThemeContext()
  const nombre = pathname?.split('/').pop()
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

  const initializeFlipbook = () => {
    // Wait a bit to ensure both scripts are fully loaded
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn && (window as any).$.fn.flipBook) {
        ((window as any).$("#container") as any).flipBook({
          pdfUrl: "/pdf/presentacion-ejecutiva.pdf",
          backgroundColor: 'transparent',
          viewMode: '3d',
          singlePageMode: true,
          pages: [
            { title: "Cover" },
            { title: "" },
            { title: "Page 3" },
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "End" },
          ],
          btnToc: { enabled: false },
          btnSelect: { enabled: false },
          btnDownloadPages: { enabled: false },
          btnDownloadPdf: { enabled: false },
          btnPrint: { enabled: false },
          btnShare: { enabled: false },
          btnZoomIn: { vAlign: 'top', hAlign: 'right', background: '#7C5CFF' },
          btnZoomOut: { vAlign: 'top', hAlign: 'right', background: '#7C5CFF' },
          btnSound: { vAlign: 'top', hAlign: 'right', background: '#7C5CFF' },
          btnThumbs: { vAlign: 'top', hAlign: 'right', background: '#7C5CFF' },
          btnBookmark: { enabled: false },
          btnExpand: { vAlign: 'top', hAlign: 'right', background: '#7C5CFF' },
          btnAutoplay: { vAlign: 'top', hAlign: 'right', background: '#7C5CFF' },
          currentPage: { hAlign: 'center' },
          btnBackground: 'rgb(36 86 200);'
        });
      } else {
        console.error('jQuery or flipBook not available');
      }
    }, 100);
  };

  useEffect(() => {
    initializeFlipbook()
  }, []);

  return (
      <div className='relative bh-page isolate pt-[72px]'>
        <PageBackground src='https://webinars.webinarsenconcreto.com/images/webinars.jpg' />
        <div className='bh-container-full'>
          {/* Fuera de la cuadrícula para que el menú y el contenido empiecen a la misma altura */}
          <BotonRegresar />
          <div className='grid w-full grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]'>
            <div>
              {webinar && <MenuLateral
                id={webinar.id}
                imagen={webinar.imagen}
                nombre={webinar.nombre}
                seccion=""
                categoria=""
              />}
            </div>
            <div>
              <div className='relative w-full min-h-screen border border-ink rounded-md bg-graphite shadow-hard'>
                <div id="container"></div>
              </div>
              {/*categoria === ' PRESENTACIÓN EJECUTIVA' && <Documento lanorma={lanorma} />}
              {categoria === ' PRESENTACIÓN GRABADA' && <Player/>}
              {categoria === ' EVALUACIÓN FINAL' && <Evaluacion categoria={nombre} curso={webinar?.nombre} />}
              {categoria === ' CONTENIDO ADICIONAL' && <Contenido categoria={nombre}/>} */}
            </div>
          </div>
        </div>
        <Script
          src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"
          strategy="afterInteractive"
          onLoad={() => {
            // jQuery loaded, now load flipbook
            const flipbookScript = document.createElement('script');
            flipbookScript.src = '/js/flipbook.min.js';
            flipbookScript.onload = initializeFlipbook;
            document.body.appendChild(flipbookScript);
          }}
        />
    </div>
    
  )
}
