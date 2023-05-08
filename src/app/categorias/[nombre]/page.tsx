"use client"
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import Header from '@/app/components/Header';

export default function Nombre() {

  const searchParams = useSearchParams();
  const nombre = searchParams.get('nombre');

  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <Header/>
        <div className='row w-100 h-100 contenidos'>
          <div className='col-3'>
            <div className='barra_lateral'>
              <h2 className="text-white">{nombre}</h2>
              <ul className='menu'>
                <li>
                  <Link href=''><BsChevronRight className='icono'/> PRESENTACIÓN EJECUTIVA</Link>
                </li>
                <li>
                  <Link href=''><BsChevronRight className='icono'/> PRESENTACIÓN GRABADA</Link>
                </li>
                <li>
                  <Link href=''><BsChevronRight className='icono'/> EVALUACIÓN FINAL</Link>
                </li>
                <li>
                  <Link href=''><BsChevronRight className='icono'/> CONTENIDO ADICIONAL</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='col documento'>
            
          </div>
        </div>
        <p className='text-center p-0'><small>© 1959 - 2023 Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
      </div>
      
    </div>
  )
}
