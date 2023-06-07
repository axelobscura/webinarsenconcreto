"use client"
// @ts-ignore
import React, { useState, useEffect } from 'react';
import './loader.js'
import $ from "jquery"
import Script from 'next/script';

export default function Documento({ lanorma } : {lanorma: any | null}) {
  const [paginas, setPagina] = useState([]);
  let ruta;
  let extension;
  if(lanorma.documento === "ASTM_C_31"){
    ruta = "https://webinarsenconcreto.com/images/ASTM_C_31";
    extension = "jpg";
  }
  useEffect(() => {
    for(let i = 1; i < 16; i++){
      // @ts-ignore
      setPagina(paginas => [{
        'src': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva'+i+'.jpg',
        'thumb': 'https://webinarsenconcreto.com/images/ASTM_C_31/Diapositiva'+i+'.jpg',
        'title': 'Página '+i,
      }])
    }
  }, []);

  return (
      <div>
        {paginas && 
          <Script
            src="/js/flipbook.min.js" 
            onLoad={() => {
              console.log('paginas test: ', paginas);
              ($("#containePDF") as any).flipBook({
                pages: paginas,
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
        }
        <h2 className='peje'>PRESENTACIÓN EJECUTIVA</h2>
        <div id="containePDF" style={{'position':'absolute','width':'73%','height':'75%'}}></div>
      </div>
  )
}
