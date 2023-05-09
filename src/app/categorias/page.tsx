"use client"
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import { BsChevronRight } from "react-icons/bs"
import { categorias } from '../data/categorias.json'
//import { useEntries } from '../../../lib/swr-hooks';

export default function Categorias() {
  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <Header />
        <div className='cat-entrada'>
          <div className='menu-categorias'>
            <ul>
              {categorias.map((val: any, i: number) => (
                <li key={i}>
                  <Link
                    href={{
                      pathname: `/categorias/${val.nombre.toLowerCase().split(' ').join('-')}`,
                      query: { 
                        nombre: val.nombre,
                        img: val.imagen,
                      },
                    }}
                  >
                      <Image
                        src={val.imagen}
                        alt="Webinars en concreto instituto mexicano del cemento y del concreto"
                        width="180"
                        height="100"
                      />
                      <div className='d-flex justify-content-center align-items-center mt-2'>
                        <BsChevronRight /> 
                        <p className='m-0'>{val.nombre}</p>
                      </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className='text-center p-0'><small>© 1959 - 2023 Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
        </div>
    </div>
  )
}
