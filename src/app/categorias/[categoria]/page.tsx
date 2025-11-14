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

  return (
    <div  className='container-fluid categorias'>
        <Header />
        <div className='cat-entrada'>
          <div className='menu-categorias'>
            <h2 className='text-white fw-bold mb-3'>{categoriaData && categoriaData.nombre.toUpperCase().split('-').join(' ')}</h2>
          </div>
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
  )
}
