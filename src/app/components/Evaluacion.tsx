"use client"

export default function Evaluacion({ categoria } : {categoria: string | null}) {

  return (
      <div className='evaluacion'>
        <h2>{categoria}</h2>
      </div>
  )
}
