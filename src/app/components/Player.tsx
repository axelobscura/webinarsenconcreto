"use client"
import { useState, useEffect, useRef } from 'react';
import type Plyr from 'plyr';
import 'plyr/dist/plyr.css';

// Video que se muestra cuando no se indica ninguno
const VIDEO_PREDETERMINADO = 'bTqVqk7FSmY';

type PlayerProps = {
  // Código de YouTube del video (p. ej. "bTqVqk7FSmY")
  codigo?: string | null;
  // Id del contenido en la base de datos; su código de YouTube se busca en /api/getvideo/[id]
  idContenido?: string | number | null;
};

// Acepta el código solo o una URL de YouTube (watch?v=, youtu.be/, embed/, shorts/) y devuelve el código
const extraerCodigo = (valor?: string | null) => {
  if (!valor) return null;
  const texto = String(valor).trim();
  const coincidencia = texto.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return coincidencia ? coincidencia[1] : texto;
};

export default function Player({ codigo, idContenido }: PlayerProps) {
  const contenedor = useRef<HTMLDivElement>(null);
  const [codigoBuscado, setCodigoBuscado] = useState<string | null>(null);
  const [estado, setEstado] = useState<'cargando' | 'listo' | 'sin-video' | 'error'>('cargando');

  const buscarEnBaseDeDatos = !codigo && idContenido !== undefined && idContenido !== null && idContenido !== '';

  // Busca el código de YouTube (columna "codigo") del contenido en la tabla "videos"
  useEffect(() => {
    if (!buscarEnBaseDeDatos) return;
    let cancelado = false;
    setEstado('cargando');
    setCodigoBuscado(null);
    async function fetchData() {
      try {
        const response = await fetch(`/api/getvideo/${encodeURIComponent(String(idContenido))}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const encontrado = extraerCodigo(data.results?.[0]?.codigo);
        if (cancelado) return;
        setCodigoBuscado(encontrado);
        setEstado(encontrado ? 'listo' : 'sin-video');
      } catch (error) {
        console.error('Error al cargar el video:', error);
        if (!cancelado) setEstado('error');
      }
    }
    fetchData();
    return () => { cancelado = true; };
  }, [buscarEnBaseDeDatos, idContenido]);

  const codigoFinal = codigo
    ? extraerCodigo(codigo)
    : buscarEnBaseDeDatos
      ? codigoBuscado
      : VIDEO_PREDETERMINADO;

  // Crea el reproductor cuando ya se conoce el código; se vuelve a crear si el video cambia
  useEffect(() => {
    const elemento = contenedor.current;
    if (!codigoFinal || !elemento) return;
    let reproductor: Plyr | null = null;
    let cancelado = false;
    // Plyr reemplaza el elemento que recibe, así que se usa uno nuevo en cada video
    const destino = document.createElement('div');
    destino.dataset.plyrProvider = 'youtube';
    destino.dataset.plyrEmbedId = codigoFinal;
    elemento.replaceChildren(destino);
    import('plyr').then(({ default: PlyrClase }) => {
      if (!cancelado) reproductor = new PlyrClase(destino);
    });
    return () => {
      cancelado = true;
      reproductor?.destroy();
      elemento.replaceChildren();
    };
  }, [codigoFinal]);

  return (
      <div className='player'>
        <div className='p-3 border rounded-md border-ink bg-ink shadow-hard'>
          {codigoFinal ? (
            <div ref={contenedor} className='aspect-video' />
          ) : (
            <div className='flex items-center justify-center p-6 text-sm font-bold tracking-widest text-center uppercase aspect-video text-steel'>
              {estado === 'cargando' && 'Cargando video…'}
              {estado === 'sin-video' && 'Este contenido aún no tiene video.'}
              {estado === 'error' && 'No se pudo cargar el video. Intenta de nuevo más tarde.'}
            </div>
          )}
        </div>
      </div>
  )
}
