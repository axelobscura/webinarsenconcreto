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
              pdfUrl:"https://www.webinarsenconcreto.com/imcyc/libros/grado.pdf",
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
