'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsSearch, BsX, BsArrowRight } from 'react-icons/bs';

type Resultado = { tipo: string, titulo: string, detalle?: string, href: string };

// Minúsculas y sin acentos, para que "tecnologia" encuentre "Tecnología"
const normalizar = (texto: string) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const ORDEN_TIPOS = ['Categoría', 'Curso', 'Líder'];
const MAXIMO = 20;

// Buscador del encabezado. Carga el índice de /api/buscar la primera vez que se usa y filtra en el navegador.
export default function Buscador() {
  const router = useRouter();
  const [indice, setIndice] = useState<Resultado[] | null>(null);
  const [error, setError] = useState(false);
  const [texto, setTexto] = useState('');
  const [abierto, setAbierto] = useState(false);
  const [movilAbierto, setMovilAbierto] = useState(false);
  const [activo, setActivo] = useState(0);
  const contenedor = useRef<HTMLDivElement>(null);
  const entrada = useRef<HTMLInputElement>(null);
  const cargando = useRef(false);

  const cargarIndice = async () => {
    if (indice || cargando.current) return;
    cargando.current = true;
    try {
      const res = await fetch('/api/buscar');
      const datos = await res.json();
      setIndice(datos.results ?? []);
      setError(!res.ok);
    } catch {
      setError(true);
    } finally {
      cargando.current = false;
    }
  };

  const resultados = useMemo(() => {
    const busqueda = normalizar(texto.trim());
    if (!busqueda || !indice) return [];
    const palabras = busqueda.split(/\s+/);
    return indice
      // Solo el título: si también buscara en la categoría, "tecnología" traería todos sus cursos
      .filter((r) => {
        const titulo = normalizar(r.titulo);
        return palabras.every((p) => titulo.includes(p));
      })
      .sort((a, b) => {
        // Primero los que empiezan con lo buscado, luego por tipo
        const inicioA = normalizar(a.titulo).startsWith(busqueda) ? 0 : 1;
        const inicioB = normalizar(b.titulo).startsWith(busqueda) ? 0 : 1;
        return inicioA - inicioB || ORDEN_TIPOS.indexOf(a.tipo) - ORDEN_TIPOS.indexOf(b.tipo);
      })
      .slice(0, MAXIMO)
      .sort((a, b) => ORDEN_TIPOS.indexOf(a.tipo) - ORDEN_TIPOS.indexOf(b.tipo));
  }, [texto, indice]);

  useEffect(() => { setActivo(0); }, [texto]);

  const cerrar = () => {
    setAbierto(false);
    setMovilAbierto(false);
  };

  // Cerrar al hacer clic fuera
  useEffect(() => {
    if (!abierto && !movilAbierto) return;
    const alClic = (e: MouseEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) cerrar();
    };
    document.addEventListener('mousedown', alClic);
    return () => document.removeEventListener('mousedown', alClic);
  }, [abierto, movilAbierto]);

  // Atajo "/" para enfocar el buscador desde cualquier página
  useEffect(() => {
    const alTecla = (e: KeyboardEvent) => {
      const destino = e.target as HTMLElement;
      const escribiendo = ['INPUT', 'TEXTAREA', 'SELECT'].includes(destino.tagName) || destino.isContentEditable;
      if (e.key === '/' && !escribiendo) {
        e.preventDefault();
        setMovilAbierto(true);
        setTimeout(() => entrada.current?.focus(), 0);
      }
    };
    document.addEventListener('keydown', alTecla);
    return () => document.removeEventListener('keydown', alTecla);
  }, []);

  const ir = (resultado: Resultado) => {
    router.push(resultado.href);
    setTexto('');
    cerrar();
    entrada.current?.blur();
  };

  const alTeclaEntrada = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActivo((i) => Math.min(i + 1, resultados.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActivo((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && resultados[activo]) {
      e.preventDefault();
      ir(resultados[activo]);
    } else if (e.key === 'Escape') {
      cerrar();
      entrada.current?.blur();
    }
  };

  const mostrarPanel = abierto && texto.trim().length > 0;

  return (
    <div ref={contenedor} className='md:relative md:flex-1 md:max-w-md'>
      {/* En móvil, un botón con lupa abre el buscador bajo el encabezado */}
      <button
        type='button'
        onClick={() => { setMovilAbierto(!movilAbierto); setTimeout(() => entrada.current?.focus(), 0); }}
        aria-label='Buscar'
        aria-expanded={movilAbierto}
        className={`flex items-center justify-center w-11 h-11 transition md:hidden ${movilAbierto ? 'bg-gradient-to-r from-cobalt to-navy' : 'hover:bg-white/10'}`}
      >
        <BsSearch className='text-xl' />
      </button>

      <div className={`${movilAbierto ? 'block' : 'hidden'} md:block absolute md:static left-0 right-0 top-full px-5 py-3 md:p-0 bg-ink md:bg-transparent border-b border-ink md:border-0`}>
        <div className='relative'>
          <BsSearch className='absolute -translate-y-1/2 pointer-events-none left-4 top-1/2 text-steel' />
          <input
            ref={entrada}
            type='search'
            value={texto}
            onChange={(e) => { setTexto(e.target.value); setAbierto(true); }}
            onFocus={() => { cargarIndice(); setAbierto(true); }}
            onKeyDown={alTeclaEntrada}
            placeholder='Buscar cursos, categorías, líderes…'
            aria-label='Buscar en la plataforma'
            role='combobox'
            aria-expanded={mostrarPanel}
            aria-controls='buscador-resultados'
            aria-autocomplete='list'
            className='w-full py-2.5 pr-10 text-sm text-white border rounded-md pl-11 bg-white/5 border-white/10 placeholder:text-steel outline-none transition focus:border-cobalt focus:bg-white/10 [&::-webkit-search-cancel-button]:hidden'
          />
          {texto && (
            <button
              type='button'
              onClick={() => { setTexto(''); entrada.current?.focus(); }}
              aria-label='Borrar búsqueda'
              className='absolute -translate-y-1/2 right-3 top-1/2 text-steel hover:text-white'
            >
              <BsX className='text-xl' />
            </button>
          )}
        </div>

        {mostrarPanel && (
          <div
            id='buscador-resultados'
            role='listbox'
            className='absolute left-5 right-5 mt-2 overflow-y-auto border rounded-md md:left-0 md:right-0 max-h-[70vh] bg-surface border-ink shadow-hard-lg'
          >
            {!indice && !error && <p className='px-5 py-4 text-sm text-steel'>Cargando…</p>}
            {error && <p className='px-5 py-4 text-sm text-steel'>No se pudo cargar el buscador. Intenta de nuevo más tarde.</p>}
            {indice && !error && resultados.length === 0 && (
              <p className='px-5 py-4 text-sm text-steel'>Sin resultados para “{texto.trim()}”</p>
            )}
            {resultados.map((r, i) => {
              const nuevoGrupo = i === 0 || resultados[i - 1].tipo !== r.tipo;
              return (
                <div key={`${r.tipo}-${r.href}-${i}`}>
                  {nuevoGrupo && (
                    <p className='flex items-center gap-2 px-5 pt-4 pb-2 text-[11px] font-bold tracking-[0.2em] uppercase text-steel'>
                      <span className='w-3 h-0.5 bg-gradient-to-r from-cobalt to-navy' /> {r.tipo === 'Categoría' ? 'Categorías' : r.tipo === 'Curso' ? 'Cursos' : 'Líderes'}
                    </p>
                  )}
                  <button
                    type='button'
                    role='option'
                    aria-selected={i === activo}
                    onMouseEnter={() => setActivo(i)}
                    onClick={() => ir(r)}
                    className={`flex items-center justify-between w-full gap-4 px-5 py-3 text-left transition ${i === activo ? 'bg-mist' : ''}`}
                  >
                    <span className='min-w-0'>
                      <span className='block text-sm font-bold truncate'>{r.titulo}</span>
                      {r.detalle && <span className='block text-xs truncate text-steel'>{r.detalle}</span>}
                    </span>
                    <BsArrowRight className={`shrink-0 transition ${i === activo ? 'text-sky translate-x-0.5' : 'text-steel/50'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
