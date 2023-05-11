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

  return (
    <div className="container-fluid login categorias">
      <div className='branding'>
        <Header/>
        <div className='row w-100 h-100 contenidos'>
          <div className='col-3'>
            <div className='barra_lateral'>
              <Link href='/categorias' className='regresar'><BsChevronLeft/> REGRESAR</Link>
              <Image
                src={imagen ? imagen : ''}
                alt="Webinars en concreto instituto mexicano del cemento y del concreto"
                width="100" height="100" layout="responsive"
              />
              <h2 className="text-white">{nombre}</h2>
              <ul className='menu'>
                <li>
                  <a onClick={seccion} className={categoria === ' PRESENTACIÓN EJECUTIVA' ? 'active mb-0' : 'mb-0'}><BsChevronRight/> PRESENTACIÓN EJECUTIVA</a>
                  <ul className='normas'>
                    {normas && normas.map((val: any) => (
                      <li key={val.id}>
                        <a onClick={() => norma(val)}>
                          <p>{val.astm}</p>
                          <p>{val.nmx}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
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
