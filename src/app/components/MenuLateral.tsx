import Image from 'next/image'
import Link from 'next/link';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation'

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
    const router = useRouter()
    const back = () => {
      router.back()
    }
  return (
    <div className='barra_lateral'>
    <button onClick={back} className='regresar'><BsChevronLeft/> REGRESAR</button>
    <Image
      src={imagen ? imagen : ''}
      alt="Webinars en concreto instituto mexicano del cemento y del concreto"
      width="100" 
      height="100"
    />
    <h2 className="text-white text-center">{nombre}</h2>
    <ul className='menu'>
      <li>
        <a onClick={seccion} className={categoria === ' PRESENTACIÓN EJECUTIVA' ? 'active mb-0' : 'mb-0'}><BsChevronRight/> PRESENTACIÓN EJECUTIVA</a>
      </li>
      <li>
        <a onClick={seccion} className={categoria === ' PRESENTACIÓN GRABADA' ? 'active' : ''}><BsChevronRight/> PRESENTACIÓN GRABADA</a>
      </li>
      <li>
        <a onClick={seccion} className={categoria === ' PRESENTACIÓN EJECUTIVA' ? 'active mb-0' : 'mb-0'}><BsChevronRight/> DATO EN CONCRETO</a>
      </li>
      <li>
        <a onClick={seccion} className={categoria === ' PRESENTACIÓN EJECUTIVA' ? 'active mb-0' : 'mb-0'}><BsChevronRight/> INFOGRAFÍAS</a>
      </li>
      <li>
        <a onClick={seccion} className={categoria === ' EVALUACIÓN FINAL' ? 'active' : ''}><BsChevronRight/> EVALUACIÓN FINAL</a>
      </li>
      <li>
        <a onClick={seccion} className={categoria === ' CONTENIDO ADICIONAL' ? 'active' : ''}><BsChevronRight/> CONTENIDO ADICIONAL</a>
      </li>
    </ul>
  </div>
  )
}
