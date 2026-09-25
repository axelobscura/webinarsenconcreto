import Image from 'next/image'
import Link from 'next/link';
import { useThemeContext } from '../context/theme'
import { BsArrowRight } from "react-icons/bs";

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

  const itemsMenuModulo = [
    { nombre: 'EVALUACIÓN DIAGNÓSTICO', url: `/categorias/${contenido}/${categoria}/${modulo}/evaluación-diagnóstico` },
    { nombre: 'PRESENTACIÓN EJECUTIVA', url: `/categorias/${contenido}/${categoria}/${modulo}/presentación-ejecutiva` },
    { nombre: 'DATO EN CONCRETO', url: `/categorias/${contenido}/${categoria}/${modulo}/dato-en-concreto` },
    { nombre: 'INFOGRAFÍAS', url: `/categorias/${contenido}/${categoria}/${modulo}/infografías` },
    { nombre: 'VIDEOS', url: `/categorias/${contenido}/${categoria}/${modulo}/videos` },
    { nombre: 'EVALUACIÓN FINAL', url: `/categorias/${contenido}/${categoria}/${modulo}/evaluación-final` },
    { nombre: 'CONTENIDO ADICIONAL', url: `/categorias/${contenido}/${categoria}/${modulo}/contenido-adicional` },
    { nombre: 'CONSTANCIA DE ASISTENCIA', url: `/categorias/${contenido}/${categoria}/${modulo}/constancia-de-asistencia` },
    { nombre: 'ENCUESTA DE SALIDA', url: `/categorias/${contenido}/${categoria}/${modulo}/encuesta-de-salida` },
    { nombre: 'INTELIGENCIA ARTIFICIAL', url: `/categorias/${contenido}/${categoria}/${modulo}/encuesta-de-salida` },
  ];

  const items = modulo?.length ? itemsMenuModulo : itemsMenu;

  return (
    <aside className='lg:sticky lg:top-24'>
      <div className='overflow-hidden bh-card'>
        <Image
          src={`https://webinars.webinarsenconcreto.com/images/fundamentos/${webinar.imagen}.png` || '/imcyc_registrada.svg'}
          alt={webinar.nombre}
          title={webinar.nombre}
          width={300}
          height={200}
          className='object-cover border-b border-ink'
          style={{
            width: "100%"
          }}
        />
        <h2 className="p-5 text-xl font-bold leading-tight uppercase">{webinar?.nombre?.split("-").join(" ")}</h2>
        {modulo?.length &&
          <p className="flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-widest text-white uppercase bg-navy border-t border-ink">
            <span className='w-3 h-3 rounded-full bg-mist' /> {modulo?.split("-").join(" ")}
          </p>
        }
        <nav className='border-t border-ink'>
          <ul className='w-full p-0 m-0'>
            {items.map((item, index) => {
              const activo = tipoDecode === item.nombre;
              return (
                <li key={index} className='border-b border-ink/15 last:border-b-0'>
                  <Link
                    href={item.url}
                    className={`group flex items-center gap-4 w-full px-5 py-3 text-sm font-bold tracking-wide transition ${
                      activo ? 'bg-gradient-to-r from-cobalt to-navy text-white' : 'hover:bg-mist'
                    }`}
                  >
                    <span className={`text-xs tabular-nums ${activo ? 'text-white/70' : 'text-ink/40'}`}>{String(index + 1).padStart(2, '0')}</span>
                    <span className='flex-1'>{item.nombre}</span>
                    <BsArrowRight className={`transition group-hover:translate-x-1 ${activo ? '' : 'opacity-40'}`} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
