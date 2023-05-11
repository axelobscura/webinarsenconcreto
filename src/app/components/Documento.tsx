"use client"
// @ts-ignore
import React, { useState, useEffect } from 'react';
import './loader.js'
import $ from "jquery"
import Script from 'next/script';

export default function Documento({lanorma}:{lanorma: any}) {
  const [paginas, setPagina] = useState([]);
  const [norm, setNorm] = useState<any[]>([]);
  const [documento, setDocumento] = useState<any[]>();

  console.log(lanorma);

  useEffect(() => {
    setDocumento(lanorma);
  }, [lanorma]);

  if(!lanorma){
    return(
      <div>Loading</div>
    )
  }

  return (
      <div>
        <Script
          src="/js/flipbook.min.js" 
          onLoad={() => {
            console.log('la norma state 2: ' + documento);
            ($("#containePDF") as any).flipBook({
              //pages: [paginas],
              pdfUrl:"https://webinarsenconcreto.com/images/ASTM_C_31/ASTM_C_31.pdf",
              /*
              pages: [
                {
                  'src': `https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva1.jpg`,
                  'thumb': `https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva1.jpg`,
                  'title': 'Página 1',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva2.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva2.jpg',
                  'title': 'Página 2',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva3.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva3.jpg',
                  'title': 'Página 3',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva4.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva4.jpg',
                  'title': 'Página 4',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva6.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva6.jpg',
                  'title': 'Página 6',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva7.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva7.jpg',
                  'title': 'Página 7',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva8.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva8.jpg',
                  'title': 'Página 8',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva9.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva9.jpg',
                  'title': 'Página 9',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva10.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva10.jpg',
                  'title': 'Página 10',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva11.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva11.jpg',
                  'title': 'Página 11',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva12.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva12.jpg',
                  'title': 'Página 12',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva13.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva13.jpg',
                  'title': 'Página 13',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva14.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva14.jpg',
                  'title': 'Página 14',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva16.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva16.jpg',
                  'title': 'Página 16',
                }
              ],
              */
              skin:"dark",
              singlePageMode:true,
              layout:4,
              btnDownloadPdf: {
                enabled: false
              },
              btnShare: {
                enabled: false
              },
              btnPrint: {
                enabled: false
              },
              btnDownloadPages: {
                enabled: false
              },
            });
          }}
          defer
        />
        <div id="containePDF" style={{'position':'absolute','width':'73%','height':'75%'}}></div>
      </div>
  )
}
