"use client"
// @ts-ignore
import React, { useState, useEffect } from 'react';
import './loader.js'
import Image from 'next/image.js';
import $ from "jquery"
import Script from 'next/script';

export default function Documento({lanorma}:{lanorma: any}) {
  const [documento, setDocumento] = useState<any[]>();

  useEffect(() => {
    setDocumento(lanorma);
  }, [lanorma]);

  if(!lanorma){
    return(
      <div>Loading</div>
    )
  }

  return (
      <div className='entrada'>
        <h2>{lanorma.titulo}</h2>
      </div>
  )
}
