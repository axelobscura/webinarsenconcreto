"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoaderImcyc from '../components/LoaderImcyc';
import { PageHeading, PageBackground, Shape, acento } from '../components/Bauhaus';
import { BsArrowUpRight } from 'react-icons/bs';

function Bloque({ href, nombre, index, desfase = 0 }: { href: string, nombre: string, index: number, desfase?: number }) {
  const color = acento(index + desfase);
  return (
    <Link href={href} className={`bh-card-link group relative flex flex-col justify-between min-h-[190px] p-6 overflow-hidden ${color.bg} ${color.text}`}>
      <Shape tipo={color.shape} className='absolute w-28 h-28 transition duration-300 opacity-20 -right-10 -bottom-10 bg-current group-hover:scale-125' />
      <div className='flex items-start justify-between'>
        <span className='text-sm font-bold tracking-[0.3em]'>{String(index + 1).padStart(2, '0')}</span>
        <BsArrowUpRight className='text-2xl transition group-hover:translate-x-1 group-hover:-translate-y-1' />
      </div>
      <h3 className='relative text-2xl font-extrabold leading-tight uppercase'>{nombre}</h3>
    </Link>
  )
}

export default function Categorias() {
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/categorias_b');
      const apiData = await res.json();
      setCategorias(apiData);
    }
    fetchData();
  }, []);

  if(!categorias || categorias.length === 0){
    return(
      <LoaderImcyc />
    )
  };

  const superiores = categorias.filter((categoria) => categoria.tipo === 'superior');
  const consulta = categorias.filter((categoria) => categoria.tipo === 'consulta' && categoria.nombre !== 'Inteligencia Artificial');

  return (
    <div className='relative bh-page isolate'>
      <PageBackground src='https://webinars.webinarsenconcreto.com/images/bkg_contenidos.jpg' />
      <div className='bh-container-full'>
        <PageHeading eyebrow='Plataforma Educativa' titulo='Explora el contenido' />

        <section className='mb-16'>
          <h2 className='flex items-center gap-4 mb-6 text-3xl font-black uppercase'>
            <span className='w-8 h-8 rounded-full bg-cobalt' /> Contenido IMCYC
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
            {superiores.map((categoria, index) => (
              <Bloque key={categoria.id} href={`/categorias/${categoria.url}`} nombre={categoria.nombre} index={index} />
            ))}
          </div>
        </section>

        <section className='mb-16'>
          <h2 className='flex items-center gap-4 mb-6 text-3xl font-black uppercase'>
            <span className='w-8 h-8 bg-navy' /> Valor agregado
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
            {consulta.map((categoria, index) => (
              <Bloque key={categoria.id} href={`/${categoria.url}`} nombre={categoria.nombre} index={index} desfase={2} />
            ))}
          </div>
        </section>

        <Link href={`/asistente-concreton`} className='bh-card-link group grid grid-cols-1 overflow-hidden sm:grid-cols-[auto_1fr_auto] items-stretch bg-white'>
          <div className='flex items-center justify-center gap-2 p-6 bg-mist sm:border-r-[3px] border-ink' aria-hidden>
            <span className='w-10 h-10 rounded-full bg-ink' />
            <span className='w-10 h-10 bh-halfcircle bg-cobalt' />
          </div>
          <div className='p-6'>
            <p className='mb-1 bh-eyebrow'>Inteligencia Artificial</p>
            <h3 className='text-3xl font-black uppercase'>Asistente Concretón</h3>
          </div>
          <div className='flex items-center justify-center p-6 text-3xl text-white bg-ink'>
            <BsArrowUpRight className='transition group-hover:translate-x-1 group-hover:-translate-y-1' />
          </div>
        </Link>
      </div>
    </div>
  )
}
