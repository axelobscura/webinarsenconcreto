"use client"
// @ts-ignore
import React, { useState, useEffect } from 'react';
import './loader.js'
import $ from "jquery"
import Script from 'next/script';

export default function Documento({lanorma}:{lanorma: any}) {
  const [paginas, setPagina] = useState([]);
  const [norm, setNorm] = useState<any[]>([]);
  const [documento, setDocumento] = useState<any[]>();

  console.log('LANORMA: ',lanorma);

  useEffect(() => {
    setDocumento(lanorma);
  }, [lanorma]);

  if(!lanorma){
    return(
      <div>Loading</div>
    )
  }

  return (
      <div className='entrada' style={{
        'background': `url(${lanorma.imagen}) no-repeat center center fixed`,
      }}>
        <h2>{lanorma.titulo}</h2>
      </div>
  )
}
