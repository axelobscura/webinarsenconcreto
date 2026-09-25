"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoaderImcyc from '../components/LoaderImcyc';
import { PageHeading, PageBackground } from '../components/Bauhaus';
import { BsArrowUpRight } from 'react-icons/bs';

// Tarjeta estilo F1: carbón plano con la "esquina" que se pinta de azul al pasar el cursor
function Bloque({ href, nombre, index }: { href: string, nombre: string, index: number, desfase?: number }) {
  return (
    <Link href={href} className='relative flex flex-col justify-between min-h-[190px] p-6 overflow-hidden group bh-card-link'>
      <span aria-hidden className='absolute font-black leading-none transition duration-200 select-none -right-2 -bottom-6 text-[8rem] text-white/5 group-hover:text-sky/20'>
        {index + 1}
      </span>
      <div className='relative flex items-start justify-between'>
        <span className='text-sm font-bold tracking-[0.2em] text-steel'>{String(index + 1).padStart(2, '0')}</span>
        <BsArrowUpRight className='text-2xl transition text-steel group-hover:text-sky group-hover:translate-x-1 group-hover:-translate-y-1' />
      </div>
      <h3 className='relative text-2xl font-black leading-tight uppercase break-words hyphens-auto lg:text-lg xl:text-xl 2xl:text-2xl'>{nombre}</h3>
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
        <PageHeading eyebrow='Plataforma Educativa Para Profesionales de La Construcción' titulo='Explora el contenido' />

        {/* Dos columnas en pantallas grandes; en móvil una sola, con Contenido IMCYC arriba */}
        <div className='grid grid-cols-1 gap-12 mb-16 lg:grid-cols-2 lg:gap-10'>
          <section>
            <h2 className='flex items-center gap-4 mb-6 text-3xl font-black uppercase'>
              <span className='w-8 h-2 bg-gradient-to-r from-cobalt to-navy' /> Contenido IMCYC
            </h2>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {superiores.map((categoria, index) => (
                <Bloque key={categoria.id} href={`/categorias/${categoria.url}`} nombre={categoria.nombre} index={index} />
              ))}
            </div>
          </section>

          <section>
            <h2 className='flex items-center gap-4 mb-6 text-3xl font-black uppercase'>
              <span className='w-8 h-2 bg-gradient-to-r from-cobalt to-navy' /> Valor agregado
            </h2>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {consulta.map((categoria, index) => (
                <Bloque key={categoria.id} href={`/${categoria.url}`} nombre={categoria.nombre} index={index} desfase={2} />
              ))}
            </div>
          </section>
        </div>

        <Link href={`/asistente-concreton`} className='bh-card-link group grid grid-cols-1 overflow-hidden sm:grid-cols-[auto_1fr_auto] items-stretch bg-surface'>
          <div className='flex items-center justify-center gap-2 p-6 bg-mist sm:border-r border-ink' aria-hidden>
            <span className='w-10 h-10 rounded-full bg-ink' />
            <span className='w-10 h-10 bh-halfcircle bg-gradient-to-r from-cobalt to-navy' />
          </div>
          <div className='p-6'>
            <p className='mb-1 bh-eyebrow'>Inteligencia Artificial</p>
            <h3 className='text-3xl font-bold uppercase'>Asistente Concretón</h3>
          </div>
          <div className='flex items-center justify-center p-6 text-3xl text-white bg-ink'>
            <BsArrowUpRight className='transition group-hover:translate-x-1 group-hover:-translate-y-1' />
          </div>
        </Link>
      </div>
    </div>
  )
}
