"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BsChevronRight } from "react-icons/bs"
import { CiSearch } from 'react-icons/ci'

const inter = Inter({ subsets: ['latin'] })

const categorias = [
  {
    'nombre': 'TÉCNICO EN PRUEBAS DE CAMPO DE CONCRETO-GRADO I',
    'tipo': 'rama',
    'imagen': 'https://www.webinarsenconcreto.com/images/bk11.jpeg',
  },
  {
    'nombre': 'TÉCNICO EN PRUEBAS DE RESISTENCIA',
    'tipo': 'rama',
    'imagen': 'https://www.webinarsenconcreto.com/images/bk4.jpeg',
  }
]

import { useEntries } from '../../../lib/swr-hooks';

export default function Categorias() {
  //const { entries, isLoading } = useEntries();
  //console.log(entries);
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

        <div className='topBar'>
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

        <div>
          <div className='menu-categorias'>
            <ul>
              {categorias.map((val, i) => (
                <li key={i}>
                  <a href={'/categorias/' + val.nombre.toLowerCase().split(' ').join('-')}>
                    <Image
                      src={val.imagen}
                      alt="Webinars en concreto instituto mexicano del cemento y del concreto"
                      width="180"
                      height="100"
                    />
                    <BsChevronRight /> <p className='m-0'>{val.nombre}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className='text-center p-0'><small>Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
      </div>
    </div>
  )
}
