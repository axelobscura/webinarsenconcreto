"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Header from '../../components/Header';
import '../../components/loader';
import $ from "jquery";
import Script from 'next/script';
import { BsChevronRight } from 'react-icons/bs';
import MenuLateral from '@/app/components/MenuLateral';

export default function Norma() {
  const searchParams = useSearchParams();
  const astm = searchParams.get('astm');
  const nmx = searchParams.get('nmx');
  const documento = searchParams.get('documento');
  console.log(documento);

  let extension = 'jpg';
  if(documento === "ASTM_C_138" || documento === "ASTM_C_173" || documento === "ASTM_C_231" || documento === "ASTM_C_1064" || documento === "ASTM_C_143"){
    extension = 'JPG';
  }

  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <Header />
        <div className='row w-100 h-100 contenidos'>
          <div className='col-3'>
            
          </div>
          <div className='col documento'>
            <h2 className='titulo'><BsChevronRight/> {astm?.split('-').join(' ')} | {nmx?.split('-').join(' ')}</h2>
            <Script
              src="/js/flipbook.min.js" 
              onReady={() => {
                ($("#containePDF") as any).flipBook({
                  //pages: [paginas],
                  //pdfUrl:"https://www.webinarsenconcreto.com/images/ASTM_C_31/ASTM_C_31.pdf",
                  pages: [
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva1.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva1.${extension}`,
                      'title': 'Página 1',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva2.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva2.${extension}`,
                      'title': 'Página 2',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva3.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva3.${extension}`,
                      'title': 'Página 3',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva4.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva4.${extension}`,
                      'title': 'Página 4',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva5.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva5.${extension}`,
                      'title': 'Página 5',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva6.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva6.${extension}`,
                      'title': 'Página 6',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva7.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva7.${extension}`,
                      'title': 'Página 7',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva8.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva8.${extension}`,
                      'title': 'Página 8',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva9.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva9.${extension}`,
                      'title': 'Página 9',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva10.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva10.${extension}`,
                      'title': 'Página 10',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva11.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva11.${extension}`,
                      'title': 'Página 11',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva12.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva12.${extension}`,
                      'title': 'Página 12',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva13.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva13.${extension}`,
                      'title': 'Página 13',
                    },
                    {
                      'src': `https://webinarsenconcreto.com/images/${documento}/Diapositiva14.${extension}`,
                      'thumb': `https://webinarsenconcreto.com/images/${documento}/Diapositiva14.${extension}`,
                      'title': 'Página 14',
                    }
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
            <div id="containePDF" style={{'position':'absolute','width':'73%','height':'75%','top':'21%'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
