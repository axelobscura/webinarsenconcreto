"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import { BsChevronRight } from "react-icons/bs"

export default function Categorias() {
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/categorias');
      const apiData = await res.json();
      setCategorias(apiData);
    }
    fetchData();
  }, []);

  if(!categorias){
    return(
      <h2>Cargando...</h2>
    )
  };

  return (
    <div  className='container-fluid categorias'>
        <Header />
        <div className='cat-entrada'>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="tipo">
                <h2 className='fs-1 text-white ps-2 mb-4 fw-bold'>Contenido IMCYC</h2>
                <div className='menu-categorias'>
                  <ul>
                    {categorias && categorias.map((val: any, i: number) => val.id_tipo === 1 &&(
                      <li key={i}>
                        <Link
                          href={{
                            pathname: `/categorias${val.link}`,
                            // query: {
                            //   id: val.id,
                            //   nombre: val.nombre,
                            //   imagen: val.imagen,
                            // },
                          }}
                        >
                            <div className='cat-image'>
                              <Image
                                src={val ? `/bkgs/${val.imagen}` : '/bkg.jpg'}
                                alt="Webinars en concreto instituto mexicano del cemento y del concreto"
                                width="180"
                                height="100"
                              />
                            </div>
                            <div className='d-flex align-items-center cat-desc'>
                              <BsChevronRight size={20} /> 
                              <p className='m-0 fs-6 py-3'>{val.nombre}</p>
                            </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="tipo">
                <h2 className='fs-1 text-white ps-2 mb-4 fw-bold'>Valor Agregado</h2>
                <div className='menu-categorias'>
                  <ul>
                    {categorias && categorias.map((val: any, i: number) => val.id_tipo === 2 &&(
                      <li key={i}>
                        <Link
                          href={{
                            pathname: `/categorias${val.link}`,
                            // query: {
                            //   id: val.id,
                            //   nombre: val.nombre,
                            //   imagen: val.imagen,
                            // },
                          }}
                        >
                            <div className='cat-image'>
                              <Image
                                src={val ? `/bkgs/${val.imagen}` : '/bkg.jpg'}
                                alt="Webinars en concreto instituto mexicano del cemento y del concreto"
                                width="180"
                                height="100"
                              />
                            </div>
                            <div className='d-flex align-items-center cat-desc'>
                              <BsChevronRight size={20} /> 
                              <p className='m-0 fs-6 py-3'>{val.nombre}</p>
                            </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
        </div>
    </div>
  )
}
