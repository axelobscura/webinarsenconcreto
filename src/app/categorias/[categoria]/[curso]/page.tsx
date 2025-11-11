"use client"
import { useState, useEffect } from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Header from '@/app/components/Header';
import MenuLateral from '@/app/components/MenuLateral';
import { useThemeContext } from '../../../context/theme'
import Script from 'next/script';

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
          btnZoomIn: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnZoomOut: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnSound: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnThumbs: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnBookmark: { enabled: false },
          btnExpand: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          btnAutoplay: { vAlign: 'top', hAlign: 'right', background: '#1f4382' },
          currentPage: { hAlign: 'center' },
          btnBackground: 'rgb(35 63 139);'
        });
      } else {
        console.error('jQuery or flipBook not available');
      }
    }, 100);
  };

  useEffect(() => {
    initializeFlipbook()
  }, []);

  // const seccion = (e: any) => {
  //   setCategoria(e.target.text);
  // }

  return (
    <div className="container-fluid login categorias">
        <Header/>
        <div className='row w-100 h-100 contenidos'>
          <div className='col-3'>
            {webinar && <MenuLateral
              id={webinar.id}
              imagen={webinar.imagen}
              nombre={webinar.nombre}
              seccion=""
              categoria=""
            />}
          </div>
          <div className='col documento'>
            {webinar ? <h2 className='titulo'><BsChevronRight/>{webinar.nombre}</h2> : ''}
            <div style={{'width':'100%','height':'90%','position':'relative', backgroundColor:'rgba(0,0,0,0.5)'}}>
              <div id="container"></div>
            </div>
            {/*categoria === ' PRESENTACIÓN EJECUTIVA' && <Documento lanorma={lanorma} />}
            {categoria === ' PRESENTACIÓN GRABADA' && <Player/>}
            {categoria === ' EVALUACIÓN FINAL' && <Evaluacion categoria={nombre}/>}
            {categoria === ' CONTENIDO ADICIONAL' && <Contenido categoria={nombre}/>} */}
          </div>
        </div>
        <Script
          src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"
          strategy="afterInteractive"
          onLoad={() => {
            // jQuery loaded, now load flipbook
            const flipbookScript = document.createElement('script');
            flipbookScript.src = 'https://gcc.webinarsenconcreto.com/js/flipbook.min.js';
            flipbookScript.onload = initializeFlipbook;
            document.body.appendChild(flipbookScript);
          }}
        />
    </div>
    
  )
}
