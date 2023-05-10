"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Header from '@/app/components/Header';
import Documento from '@/app/components/Documento';
import Player from '@/app/components/Player';
import Evaluacion from '@/app/components/Evaluacion';
import Contenido from '@/app/components/Contenido';
import { categorias } from '../../data/categorias.json'

export default function Nombre() {
  const [categoria, setCategoria] = useState(' PRESENTACIÓN EJECUTIVA');
  const [tema, setTema] = useState({});
  const [normas, setNormas] = useState([]);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const nombre = searchParams.get('nombre');

  console.log('el id:'+ id);

  useEffect(() => {
    let tipo = categorias.filter((val) => val.nombre === nombre);
    setTema(tipo);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/normas/${id}`);
  
        if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        const data = await response.json();
        setNormas(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    
  }, []);

  console.log('LAS NORMAS: '+JSON.stringify(normas));

  const seccion = (e: any) => {
    setCategoria(e.target.text);
  }

  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <Header/>
        <div className='row w-100 h-100 contenidos'>
          <div className='col-3'>
            <div className='barra_lateral'>
              <Link href='/categorias' className='regresar'><BsChevronLeft/> REGRESAR</Link>
              <h2 className="text-white">{nombre}</h2>
              <ul className='menu'>
                <li>
                  <a onClick={seccion} className={categoria === ' PRESENTACIÓN EJECUTIVA' ? 'active' : ''}><BsChevronRight/> PRESENTACIÓN EJECUTIVA</a>
                </li>
                <li>
                  <a onClick={seccion} className={categoria === ' PRESENTACIÓN GRABADA' ? 'active' : ''}><BsChevronRight/> PRESENTACIÓN GRABADA</a>
                </li>
                <li>
                  <a onClick={seccion} className={categoria === ' EVALUACIÓN FINAL' ? 'active' : ''}><BsChevronRight/> EVALUACIÓN FINAL</a>
                </li>
                <li>
                  <a onClick={seccion} className={categoria === ' CONTENIDO ADICIONAL' ? 'active' : ''}><BsChevronRight/> CONTENIDO ADICIONAL</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col documento'>
            <h2 className='titulo'><BsChevronRight/> {categoria}</h2>
            {categoria === ' PRESENTACIÓN EJECUTIVA' && <Documento/>}
            {categoria === ' PRESENTACIÓN GRABADA' && <Player/>}
            {categoria === ' EVALUACIÓN FINAL' && <Evaluacion categoria={nombre}/>}
            {categoria === ' CONTENIDO ADICIONAL' && <Contenido categoria={nombre}/>}
          </div>
        </div>
        <p className='text-center p-0 m-0'><small>© 1959 - 2023 Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
      </div>
      
    </div>
  )
}
