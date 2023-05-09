"use client"

export default function Contenido({ categoria } : {categoria: string | null}) {

  return (
      <div className='contenido'>
        <h2>{categoria}</h2>
      </div>
  )
}
