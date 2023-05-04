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
      
    </div>
  )
}
