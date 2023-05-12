"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Header from '@/app/components/Header';
import Documento from '@/app/components/Documento';
import Player from '@/app/components/Player';
import Evaluacion from '@/app/components/Evaluacion';
import Contenido from '@/app/components/Contenido';
import MenuLateral from '@/app/components/MenuLateral';

export default function Nombre() {
  const [categoria, setCategoria] = useState(' PRESENTACIÓN EJECUTIVA');
  const [tema, setTema] = useState({});
  const [normas, setNormas] = useState<any[]>([]);
  const [lanorma, setLanorma] = useState<any>({});

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const nombre = searchParams.get('nombre');
  const imagen = searchParams.get('imagen');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/normas/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setNormas(data.results);
        setLanorma({
          astm: data.results[0].astm,
          nmx: data.results[0].nmx,
          titulo: data.results[0].titulo,
          documento: data.results[0].documento,
        })
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let tipo = normas.filter((val) => val.nombre === nombre);
    setTema(tipo);
  }, []);

  const seccion = (e: any) => {
    setCategoria(e.target.text);
  }

  const norma = (val: any) => {
    setLanorma({
      astm: val.astm,
      nmx: val.nmx,
      titulo: val.titulo,
      documento: val.documento,
    })
  }

  console.log(normas);

  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <Header/>
        <div className='row w-100 h-100 contenidos'>
          <div className='col-3'>
            <MenuLateral
              imagen={imagen}
              nombre={nombre}
              seccion={seccion}
              categoria={categoria}
              normas={normas}
            />
          </div>
          <div className='col documento'>
            <h2 className='titulo'><BsChevronRight/> {categoria}</h2>
            <h3>{lanorma.titulo}</h3>
            {categoria === ' PRESENTACIÓN EJECUTIVA' && <Documento lanorma={lanorma} />}
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
