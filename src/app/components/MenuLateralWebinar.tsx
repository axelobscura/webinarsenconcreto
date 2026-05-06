import Image from 'next/image'
import Link from 'next/link';
import { useThemeContext } from '../context/theme'
import { BsChevronLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { BsArrowRightSquare } from "react-icons/bs";

export default function MenuLateralWebinar(
  { 
    webinar,
    modulo,
  } : {
    webinar?: any | null,
    modulo?: string | null,
  }) {
  const { pathname } = useThemeContext();
  const contenido = pathname?.split('/')[2];
  const categoria = pathname?.split('/')[3];
  const tipo = pathname?.split('/')[pathname.split('/').length - 1];
  const tipoDecode = decodeURIComponent(tipo ? tipo : "").split('-').join(' ').toUpperCase();
  const router = useRouter()
  const back = () => {
    router.back()
  }

  const itemsMenu = [
    { nombre: 'EVALUACIÓN DIAGNÓSTICO', url: `/categorias/${contenido}/${categoria}/evaluación-diagnóstico` },
    { nombre: 'PRESENTACIÓN EJECUTIVA', url: `/categorias/${contenido}/${categoria}/presentación-ejecutiva` },
    { nombre: 'DATO EN CONCRETO', url: `/categorias/${contenido}/${categoria}/dato-en-concreto` },
    { nombre: 'INFOGRAFÍAS', url: `/categorias/${contenido}/${categoria}/infografías` },
    { nombre: 'VIDEOS', url: `/categorias/${contenido}/${categoria}/videos` },
    { nombre: 'EVALUACIÓN FINAL', url: `/categorias/${contenido}/${categoria}/evaluación-final` },
    { nombre: 'CONTENIDO ADICIONAL', url: `/categorias/${contenido}/${categoria}/contenido-adicional` },
    { nombre: 'CONSTANCIA DE ASISTENCIA', url: `/categorias/${contenido}/${categoria}/constancia-de-asistencia` },
    { nombre: 'ENCUESTA DE SALIDA', url: `/categorias/${contenido}/${categoria}/encuesta-de-salida` },
    { nombre: 'INTELIGENCIA ARTIFICIAL', url: `/categorias/${contenido}/${categoria}/encuesta-de-salida` },
  ];

  return (
    <div>
      <Link href={`/categorias/${contenido}/`} className='flex items-center w-full p-2 mb-5 font-bold text-white bg-gray-900 rounded-md hover:bg-gray-800 hover:text-gray-300'>
        <BsChevronLeft className='mr-3 text-gray-400 bg-gray-900'/> 
        REGRESAR
      </Link>
      <Image
        src={`https://webinars.webinarsenconcreto.com/images/fundamentos/${webinar.imagen}.png` || '/imcyc_registrada.svg'}
        alt={webinar.nombre}
        title={webinar.nombre}
        width={300}
        height={200}
        className='object-cover'
        style={{
          width: "100%"
        }}
      />
      <h2 className="px-1 py-2 text-2xl font-semibold text-center text-white bg-black bg-opacity-50">{webinar?.nombre?.split("-").join(" ").toUpperCase()}</h2>
      {modulo !== 'modulos' &&
        <ul className='w-full p-0 m-0'>
          <li className='w-full'>
            {itemsMenu.map((item, index) => (
              <Link 
                href={item.url}
                key={index} 
                className={`flex items-center justify-between w-full rounded-md p-3 my-1 font-bold text-1xl hover:bg-gray-950 hover:bg-opacity-50 hover:text-gray-100 ${
                  tipoDecode === item.nombre ? 'bg-black bg-opacity-50 text-gray-100' : 'bg-white bg-opacity-30 text-white'
                }`}
              > 
                {item.nombre}
                <BsArrowRightSquare className='inline mr-2 text-white' />
              </Link>
            ))}
          </li>
        </ul>
      }
  </div>
  )
}
