"use client"
import { useState, useEffect } from 'react';

export default function Evaluacion({ categoria } : {categoria: string | null}) {

  return (
      <div className='evaluacion'>
        <h2>{categoria}</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='preguntas'>
              
            </div>
          </div>
        </div>
      </div>
  )
}
