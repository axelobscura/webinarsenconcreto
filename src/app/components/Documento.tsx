"use client"
// @ts-ignore
import React, { useState, useEffect } from 'react';
import './loader.js'
import $ from "jquery"
import Script from 'next/script';

export default function Documento({ lanorma } : {lanorma: any | null}) {
  const [paginas, setPagina] = useState([]);
  const [ruta, setRuta] = useState("https://webinarsenconcreto.com/images/ASTM_C_31")
  const [extension, setExtension] = useState("jpg");

  

  useEffect(() => {
    if(lanorma.documento === "ASTM_C_31"){
      setRuta("https://webinarsenconcreto.com/images/ASTM_C_31");
      setExtension("jpg");
    }
  }, []);

  let lapagina: any = [];
  const crearPaginas = () => {
    for(let i = 1; i < 16; i++){
      // @ts-ignore
      lapagina.push({
        'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva'+i+'.jpg',
        'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva'+i+'.jpg',
        'title': 'Página '+i,
      })
    }
  }

  return (
      <div>
        {paginas && 
          <Script
            src="/js/flipbook.min.js"
            strategy="lazyOnload"
            onLoad={() => {
              crearPaginas();
              ($("#containePDF") as any).flipBook({
                pages: lapagina,
                skin: "dark",
                singlePageMode: true,
                layout: 4,
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
        }
        <h2 className='peje'>PRESENTACIÓN EJECUTIVA</h2>
        <div id="containePDF" style={{'position':'absolute','width':'73%','height':'75%'}}></div>
      </div>
  )
}
