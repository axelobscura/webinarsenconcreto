"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Header from '@/app/components/Header';
import Documento from '@/app/components/Documento';
import Player from '@/app/components/Player';
import Evaluacion from '@/app/components/Evaluacion';
import Contenido from '@/app/components/Contenido';
import MenuLateral from '@/app/components/MenuLateral';
import { useThemeContext } from '../../../context/theme'

export default function Curso() {
  const { pathname } = useThemeContext()
  const nombre = pathname?.split('/').pop()
  const [webinar, setWebinar] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/getwebinar/${nombre}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setWebinar(data.results && data.results.length > 0 ? data.results[0] : null);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [nombre]);

  // useEffect(() => {
  //   let tipo = normas.filter((val) => val.nombre === nombre);
  //   setTema(tipo);
  // }, [nombre, normas]);

  // const seccion = (e: any) => {
  //   setCategoria(e.target.text);
  // }

  return (
    <div className="container-fluid login categorias">
        <Header/>
        <div className='row w-100 h-100 contenidos'>
          <div className='col-3'>
            {webinar && <MenuLateral
              id={webinar.id}
              imagen={webinar.imagen}
              nombre={webinar.nombre}
              seccion=""
              categoria=""
            />}
          </div>
          <div className='col documento'>
            {webinar ? <h2 className='titulo'><BsChevronRight/>{webinar.nombre}</h2> : ''}
            {/*categoria === ' PRESENTACIÓN EJECUTIVA' && <Documento lanorma={lanorma} />}
            {categoria === ' PRESENTACIÓN GRABADA' && <Player/>}
            {categoria === ' EVALUACIÓN FINAL' && <Evaluacion categoria={nombre}/>}
            {categoria === ' CONTENIDO ADICIONAL' && <Contenido categoria={nombre}/>} */}
          </div>
        </div>
    </div>
  )
}
