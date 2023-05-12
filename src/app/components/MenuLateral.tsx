import Image from 'next/image'
import Link from 'next/link';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

export default function MenuLateral(
  { 
    id,
    imagen,
    nombre,
    seccion,
    categoria,
    normas,
  } : {
    id: any | null,
    imagen: any | null,
    nombre: any,
    seccion: any | null,
    categoria: string,
    normas: any | string
  }) {
  return (
    <div className='barra_lateral'>
    <Link href='/categorias' className='regresar'><BsChevronLeft/> REGRESAR</Link>
    {/* 
    <Image
      src={imagen ? imagen : ''}
      alt="Webinars en concreto instituto mexicano del cemento y del concreto"
      width="100" 
      height="100" 
      layout="responsive"
    />
    */}
    <h2 className="text-white">{nombre}</h2>
    <ul className='menu'>
      <li>
        <a onClick={seccion} className={categoria === ' PRESENTACIÓN EJECUTIVA' ? 'active mb-0' : 'mb-0'}><BsChevronRight/> PRESENTACIÓN EJECUTIVA</a>
        <ul className='normas'>
          {normas && normas.map((val: any) => (
            <li key={val.id}>
              <Link href={{
                pathname: `/norma/${val.astm}`,
                query: {
                  id: id,
                  nombre: nombre,
                  imagen: imagen,
                  astm: val.astm,
                  nmx: val.nmx,
                  documento: val.documento,
                },
              }}>
                <p>{val.astm}</p>
                <p>{val.nmx}</p>
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <a onClick={seccion} className={categoria === ' PRESENTACIÓN GRABADA' ? 'active' : ''}><BsChevronRight/> PRESENTACIÓN GRABADA</a>
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
