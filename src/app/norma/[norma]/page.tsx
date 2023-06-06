"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import Header from '../../components/Header';
import '../../components/loader';
import $ from "jquery";
import Script from 'next/script';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

export default function Norma() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const nombre = searchParams.get('nombre');
  const imagen = searchParams.get('imagen');
  const astm = searchParams.get('astm');
  const nmx = searchParams.get('nmx');
  const documento = searchParams.get('documento');

  let extension = 'JPG';
  let ruta = `https://webinarsenconcreto.com/images/${documento}`;
  
  if(documento === "ASTM_C_31"){
    extension = 'jpg';
  }
  if(documento === "ACI-211" || documento === "ACI-214"){
    ruta = 'https://webinarsenconcreto.com/imcyc/tecnico-laboratorista/presentacion'
    extension = 'PNG';
  }
  if(documento === "superficies"){
    ruta = 'https://webinarsenconcreto.com/imcyc/superficies/presentacion'
    extension = 'JPG';
  }

  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <Header />
        <div className='row w-100 h-100 contenidos'>
          <div className='col documento'>
            <div className='d-flex flex-column align-items-start'>
              <Link 
                href={{
                  pathname: `/categorias/${nombre?.toLowerCase().split(' ').join('-')}`,
                  query: {
                    id: id,
                    nombre: nombre,
                    imagen: imagen,
                  },
                }} 
                className='regresar'>
                  <BsChevronLeft/> REGRESAR
              </Link>
              <h2 className='titulo'><BsChevronRight/> {astm?.split('-').join(' ')} | {nmx?.split('-').join(' ')}</h2>
            </div>
            <Script
              src="/js/flipbook.min.js" 
              onReady={() => {
                ($("#containePDF") as any).flipBook({
                  //pages: [paginas],
                  //pdfUrl:"https://www.webinarsenconcreto.com/images/ASTM_C_31/ASTM_C_31.pdf",
                  pages: [
                    {
                      'src': `${ruta}/Diapositiva1.${extension}`,
                      'thumb': `${ruta}/Diapositiva1.${extension}`,
                      'title': 'Página 1',
                    },
                    {
                      'src': `${ruta}/Diapositiva2.${extension}`,
                      'thumb': `${ruta}/Diapositiva2.${extension}`,
                      'title': 'Página 2',
                    },
                    {
                      'src': `${ruta}/Diapositiva3.${extension}`,
                      'thumb': `${ruta}/Diapositiva3.${extension}`,
                      'title': 'Página 3',
                    },
                    {
                      'src': `${ruta}/Diapositiva4.${extension}`,
                      'thumb': `${ruta}/Diapositiva4.${extension}`,
                      'title': 'Página 4',
                    },
                    {
                      'src': `${ruta}/Diapositiva5.${extension}`,
                      'thumb': `${ruta}/Diapositiva5.${extension}`,
                      'title': 'Página 5',
                    },
                    {
                      'src': `${ruta}/Diapositiva6.${extension}`,
                      'thumb': `${ruta}/Diapositiva6.${extension}`,
                      'title': 'Página 6',
                    },
                    {
                      'src': `${ruta}/Diapositiva7.${extension}`,
                      'thumb': `${ruta}/Diapositiva7.${extension}`,
                      'title': 'Página 7',
                    },
                    {
                      'src': `${ruta}/Diapositiva8.${extension}`,
                      'thumb': `${ruta}/Diapositiva8.${extension}`,
                      'title': 'Página 8',
                    },
                    {
                      'src': `${ruta}/Diapositiva9.${extension}`,
                      'thumb': `${ruta}/Diapositiva9.${extension}`,
                      'title': 'Página 9',
                    },
                    {
                      'src': `${ruta}/Diapositiva10.${extension}`,
                      'thumb': `${ruta}/Diapositiva10.${extension}`,
                      'title': 'Página 10',
                    },
                    {
                      'src': `${ruta}/Diapositiva11.${extension}`,
                      'thumb': `${ruta}/Diapositiva11.${extension}`,
                      'title': 'Página 11',
                    },
                    {
                      'src': `${ruta}/Diapositiva12.${extension}`,
                      'thumb': `${ruta}/Diapositiva12.${extension}`,
                      'title': 'Página 12',
                    },
                    {
                      'src': `${ruta}/Diapositiva13.${extension}`,
                      'thumb': `${ruta}/Diapositiva13.${extension}`,
                      'title': 'Página 13',
                    },
                    {
                      'src': `${ruta}/Diapositiva14.${extension}`,
                      'thumb': `${ruta}/Diapositiva14.${extension}`,
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
            <div id="containePDF" style={{'position':'relative','width':'100%','height':'85%'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
