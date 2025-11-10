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
  console.log('CATEGORIA: ', nombre);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/getwebinar/${nombre}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log('DATA: ', data);
        // setNormas(data.results);
        // setLanorma({
        //   astm: data.results[0].astm,
        //   nmx: data.results[0].nmx,
        //   titulo: data.results[0].titulo,
        //   documento: data.results[0].documento,
        //   imagen: imagen,
        // })
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
            {/* <MenuLateral
              id={id}
              imagen={imagen}
              nombre={nombre}
              seccion={seccion}
              categoria={categoria}
              normas={normas}
            /> */}
          </div>
          <div className='col documento'>
            {/* {categoria !== ' PRESENTACIÓN EJECUTIVA' ? <h2 className='titulo'><BsChevronRight/>{categoria}</h2> : ''}
            {categoria === ' PRESENTACIÓN EJECUTIVA' && <Documento lanorma={lanorma} />}
            {categoria === ' PRESENTACIÓN GRABADA' && <Player/>}
            {categoria === ' EVALUACIÓN FINAL' && <Evaluacion categoria={nombre}/>}
            {categoria === ' CONTENIDO ADICIONAL' && <Contenido categoria={nombre}/>} */}
          </div>
        </div>
    </div>
  )
}
