"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import { useThemeContext } from '../../context/theme'
import { BsChevronRight } from "react-icons/bs"

export default function Categoria() {
  const { pathname } = useThemeContext()
  const categoria = pathname?.split('/').pop()
  const [categoriaData, setCategoriaData] = useState<any>(null);
  const [webinars, setWebinars] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/getcategoria/${categoria}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setWebinars(data.webinars);
        setCategoriaData(data.categoria);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [categoria]);

  if(!categoriaData){
    return(
      <h2>Cargando...</h2>
    )
  };

  console.log(categoriaData.imagen);

  return (
    <div  className='container-fluid categorias bg-image bg-image-no-repeat bg-cover bg-center'>
      <style jsx>{`
        .bg-image {
          background-image: url('/bkgs/${categoriaData && categoriaData.imagen}');
        }
      `}</style>
        <Header />
        <div className='cat-entrada'>
          <div className="row">
            <div className="col-12 col-md-3 d-flex align-items-center justify-content-center">
              <div className="tipo w-100">
                <h2 className='text-white fw-bold bg-dark bg-opacity-50 p-5 rounded-3'>{categoriaData && categoriaData.nombre.toUpperCase().split('-').join(' ')}</h2>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className='webinars'>
                {webinars.map((val: any) => (
                  <Link href={`/categorias/${categoria}/${val.url}`} key={val.id}>
                    <div className='d-flex align-items-center cat-desc'>
                      <BsChevronRight /> 
                      <p className='m-0 fs-6'>{val.nombre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
