"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsChevronLeft } from 'react-icons/bs';

// Botón "Regresar" que va entre el encabezado y el contenido de la página,
// con el mismo margen (my-6) arriba y abajo. La página debe empezar justo bajo el encabezado (pt-[72px]).
// Con href navega a esa ruta; sin href regresa a la página anterior del historial.
export default function BotonRegresar({ href } : { href?: string }) {
  const router = useRouter();
  const clases = 'inline-flex items-center gap-3 my-6 text-sm font-bold tracking-widest uppercase hover:text-sky';
  const contenido = (
    <>
      <span className='flex items-center justify-center w-8 h-8 text-white bg-ink'><BsChevronLeft /></span>
      Regresar
    </>
  );

  if (href) {
    return <Link href={href} className={clases}>{contenido}</Link>;
  }
  return <button type='button' onClick={() => router.back()} className={clases}>{contenido}</button>;
}
