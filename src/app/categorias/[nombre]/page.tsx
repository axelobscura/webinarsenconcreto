"use client"
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { BsChevronRight } from 'react-icons/bs';
import Header from '@/app/components/Header';
import Documento from '@/app/components/Documento';

export default function Nombre() {
  const [categoria, setCategoria] = useState('');

  const searchParams = useSearchParams();
  const nombre = searchParams.get('nombre');

  const seccion = (e: any) => {
    setCategoria(e.target.text);
  }

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
                  <a onClick={seccion} className={categoria === ' PRESENTACIÓN EJECUTIVA' ? 'active' : ''}><BsChevronRight/> PRESENTACIÓN EJECUTIVA</a>
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
          </div>
          <div className='col documento'>
            <Documento/>
          </div>
        </div>
        <p className='text-center p-0'><small>© 1959 - 2023 Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
      </div>
      
    </div>
  )
}
