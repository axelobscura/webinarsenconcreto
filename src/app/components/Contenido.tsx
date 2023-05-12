"use client"
// @ts-ignore
import React, { useState, useEffect } from 'react';
import './loader.js'
import $ from "jquery"
import Script from 'next/script';

export default function Contenido({ categoria } : {categoria: string | null}) {
  const [paginas, setPagina] = useState([]);

  useEffect(() => {
    for(let i = 1; i < 16; i++){
      // @ts-ignore
      setPagina(paginas => [...paginas, {
        'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva'+i+'.jpg',
        'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva'+i+'.jpg',
        'title': 'Página '+i,
      }])
    }
  }, []);

  return (
      <div>
        <Script
          src="/js/flipbook.min.js" 
          onReady={() => {
            ($("#containePDF") as any).flipBook({
              //pdfUrl:"/libros/grado.pdf",

              pages: [
                {
                  'src': `https://webinarsenconcreto.com/images/2023/grado/pagina_001.jpg`,
                  'thumb': `https://webinarsenconcreto.com/images/2023/grado/pagina_001.jpg`,
                  'title': 'Página 1',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/2023/grado/pagina_002.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/2023/grado/pagina_002.jpg',
                  'title': 'Página 2',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/2023/grado/pagina_003.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/2023/grado/pagina_003.jpg',
                  'title': 'Página 3',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/2023/grado/pagina_004.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/2023/grado/pagina_004.jpg',
                  'title': 'Página 4',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/2023/grado/pagina_005.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/2023/grado/pagina_005.jpg',
                  'title': 'Página 6',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/2023/grado/pagina_006.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/2023/grado/pagina_006.jpg',
                  'title': 'Página 7',
                },
                {
                  'src': 'https://webinarsenconcreto.com/images/2023/grado/pagina_007.jpg',
                  'thumb': 'https://webinarsenconcreto.com/images/2023/grado/pagina_007.jpg',
                  'title': 'Página 8',
                },
              ],

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
