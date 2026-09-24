'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegUserCircle } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import { useThemeContext } from '../context/theme';

function MenuUsuario() {
  const { usuario, logout } = useThemeContext();
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const alClic = (e: MouseEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    };
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(false);
    };
    document.addEventListener('mousedown', alClic);
    document.addEventListener('keydown', alTecla);
    return () => {
      document.removeEventListener('mousedown', alClic);
      document.removeEventListener('keydown', alTecla);
    };
  }, [abierto]);

  if (!usuario) return null;

  return (
    <div ref={contenedor} className='relative'>
      <button
        type='button'
        onClick={() => setAbierto(!abierto)}
        aria-haspopup='menu'
        aria-expanded={abierto}
        aria-label='Menú de usuario'
        className={`flex items-center justify-center w-11 h-11 transition ${abierto ? 'bg-cobalt' : 'hover:bg-white/10'}`}
      >
        <FaRegUserCircle className='text-3xl' />
      </button>
      {abierto && (
        <div role='menu' className='absolute right-0 top-full mt-3 w-72 bg-white text-ink border-[3px] border-ink shadow-hard'>
          <div className='px-5 py-4 border-b-[3px] border-ink bg-mist'>
            <p className='mb-1 bh-eyebrow'><span className='w-2.5 h-2.5 rounded-full bg-cobalt' /> Sesión iniciada</p>
            <p className='font-bold break-all'>{usuario.email}</p>
          </div>
          <button
            type='button'
            role='menuitem'
            onClick={() => { setAbierto(false); logout(); }}
            className='flex items-center justify-between w-full px-5 py-4 text-sm font-bold tracking-widest uppercase transition hover:bg-cobalt hover:text-white'
          >
            Cerrar sesión <BsBoxArrowRight className='text-lg' />
          </button>
        </div>
      )}
    </div>
  );
}

export default function FixedHeader() {

  return (
    <header className='fixed top-0 left-0 z-50 w-full text-white bg-ink'>
      <div className='flex items-center justify-between w-full px-5 py-3 sm:px-10'>
        <Link href='/categorias' className='flex items-center gap-4'>
          <Image
            src="/imcyc_registrada.svg"
            alt="Webinars en concreto instituto mexicano del cemento y del concreto"
            width="64"
            height="64"
          />
          <span className='hidden h-10 w-[3px] bg-white sm:block' />
          <span className='hidden text-sm font-bold tracking-[0.3em] uppercase sm:block'>Plataforma Educativa</span>
        </Link>
        <div className='flex items-center gap-4'>
          <span className='hidden gap-1.5 md:flex' aria-hidden>
            <span className='w-3 h-3 rounded-full bg-cobalt' />
            <span className='w-3 h-3 bg-mist' />
            <span className='w-3 h-3 bg-steel' />
          </span>
          <MenuUsuario />
        </div>
      </div>
      <div className='h-1.5 bh-stripe' />
    </header>
  )
}
