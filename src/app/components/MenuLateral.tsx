import Image from 'next/image'
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';

const secciones = [
  { nombre: 'PRESENTACIÓN EJECUTIVA', activa: ' PRESENTACIÓN EJECUTIVA' },
  { nombre: 'PRESENTACIÓN GRABADA', activa: ' PRESENTACIÓN GRABADA' },
  { nombre: 'DATO EN CONCRETO', activa: ' PRESENTACIÓN EJECUTIVA' },
  { nombre: 'INFOGRAFÍAS', activa: ' PRESENTACIÓN EJECUTIVA' },
  { nombre: 'EVALUACIÓN FINAL', activa: ' EVALUACIÓN FINAL' },
  { nombre: 'CONTENIDO ADICIONAL', activa: ' CONTENIDO ADICIONAL' },
];

export default function MenuLateral(
  {
    id,
    imagen,
    nombre,
    seccion,
    categoria,
  } : {
    id: any | null,
    imagen: any | null,
    nombre: any | null,
    seccion: any | null,
    categoria: string | null,
  }) {

  return (
    <aside className='lg:sticky lg:top-24'>
      <div className='overflow-hidden bh-card'>
        <h2 className="p-5 text-xl font-bold leading-tight uppercase border-b border-ink">{nombre}</h2>
        <ul className='w-full p-0 m-0'>
          {secciones.map((item, index) => {
            const activo = categoria === item.activa;
            return (
              <li key={item.nombre} className='border-b border-ink/15 last:border-b-0'>
                <a
                  onClick={seccion}
                  className={`group flex items-center gap-4 w-full px-5 py-3 text-sm font-bold tracking-wide cursor-pointer transition ${
                    activo ? 'bg-gradient-to-r from-cobalt to-navy text-white' : 'hover:bg-mist'
                  }`}
                >
                  <span className={`text-xs tabular-nums ${activo ? 'text-white/70' : 'text-ink/40'}`}>{String(index + 1).padStart(2, '0')}</span>
                  <span className='flex-1'>{item.nombre}</span>
                  <BsArrowRight className={`transition group-hover:translate-x-1 ${activo ? '' : 'opacity-40'}`} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
