"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BsChevronRight } from "react-icons/bs"
import { CiSearch } from 'react-icons/ci'

const inter = Inter({ subsets: ['latin'] })

const categorias = [
  {
    'nombre': 'TECNOLOGÍA DEL CONCRETO',
    'tipo': 'rama',
    'temas': [
      {
        'nombre': 'FUNDAMENTOS DEL CONCRETO',
        'tipo': 'tema',
        'codigo': '2310001',
      }
    ]
  },
  {
    'nombre': 'MANUALES',
    'tipo': 'rama'
  },
  {
    'nombre': 'ACI',
    'tipo': 'rama'
  },
  {
    'nombre': 'EMPRESAS',
    'tipo': 'rama'
  },
  {
    'nombre': 'OCPER',
    'tipo': 'rama'
  },
  {
    'nombre': 'INTERNACIONAL',
    'tipo': 'rama'
  },
  {
    'nombre': 'LIBRERÍA',
    'tipo': 'rama'
  }
]

import { useEntries } from '../../../lib/swr-hooks';

export default function Categorias() {
  //const { entries, isLoading } = useEntries();
  console.log(entries);
  /*
  if (isLoading || !entries) {
    return (
      <h1></h1>
    )
  };
  */
  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <div className='text-center'>
          <Image
              src="/imcyc_registrada.svg"
              alt="Webinars en concreto instituto mexicano del cemento y del concreto"
              width="180"
              height="100"
              style={{
                marginLeft: '-12px'
              }}
          />
          <div className="input-group mt-3">
            <input type="text" className="form-control" placeholder="Buscar contenido" />
            <button className="btn btn-outline-secondary m-0 p-2" type="button" id="button-addon2"><CiSearch style={{'fontSize':'1.7rem'}}/></button>
          </div>
        </div>
        <div className='menu-categorias'>
          <ul>
            {categorias.map((val, i) => (
              <li key={i}>
                <a href={'/categorias/' + val.nombre}><BsChevronRight /> {val.nombre}</a>
              </li>
            ))}
          </ul>
        </div>
        <p className='text-center p-0'><small>Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
      </div>
    </div>
  )
}
