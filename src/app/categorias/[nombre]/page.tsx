"use client"
import { useSearchParams } from 'next/navigation';

export default function Nombre() {

  const searchParams = useSearchParams();
  const nombre = searchParams.get('nombre');

  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <h2 className="text-white">{nombre}</h2>
      </div>
      
      <p className='text-center p-0'><small>© 1959 - 2023 Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
    </div>
  )
}
