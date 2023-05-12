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
