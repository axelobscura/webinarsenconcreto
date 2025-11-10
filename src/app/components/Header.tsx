import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CiSearch } from 'react-icons/ci';
import { FaRegUserCircle } from "react-icons/fa";
import { useThemeContext } from '../context/theme';

export default function Header() {
  const [eltermino, setEltermino] = useState('');
  const { pathname } = useThemeContext();
  const path = pathname?.split('/');

  const getPath = () => {
    const path = pathname?.split('/');
    if (!path || path.length === 0) return '';
    
    // Helper function to format text
    const formatText = (text: string) => {
      return text.toUpperCase().split('-').join(' ');
    };
    
    // Home or categorias list page
    if (path.length <= 2 || (path.length === 2 && path[1] === 'categorias')) {
      return <Link href="/categorias" className="text-white text-decoration-none">| Plataforma Educativa</Link>;
    }
    
    // Categoria page: /categorias/[categoria]
    if (path.length === 3 && path[1] === 'categorias') {
      const categoria = path[2];
      return (
        <>
          <Link href="/categorias" className="text-white text-decoration-none">| Plataforma Educativa</Link>
          <Link href={`/categorias/${categoria}`} className="text-white text-decoration-none"> | {formatText(categoria)}</Link>
        </>
      );
    }
    
    // Curso page: /categorias/[categoria]/[curso]
    if (path.length === 4 && path[1] === 'categorias') {
      const categoria = path[2];
      const curso = path[3];
      return (
        <>
          <Link href="/categorias" className="text-white text-decoration-none">| Plataforma Educativa</Link>
          <Link href={`/categorias/${categoria}`} className="text-white text-decoration-none"> | {formatText(categoria)}</Link>
          <Link href={`/categorias/${categoria}/${curso}`} className="text-white text-decoration-none"> | {formatText(curso)}</Link>
        </>
      );
    }
    
    return '';
  }

  return (
    <>
      <div className='topBar d-flex align-items-center'>
        <div className='col-8 col-md-8 d-flex align-items-center'>
          <Link href={path && path.length > 1 ? '/categorias' : '/'}>
            <Image
              src="/imcyc_registrada.svg"
              alt="Webinars en concreto instituto mexicano del cemento y del concreto"
              width="150"
              height="70"
              style={{
                marginLeft: '-12px'
              }}
            />
          </Link>
          <span className='text-white ms-2 fs-2'> {(() => {
            return getPath();
          })()}</span>
        </div>
        <div className='col-4 col-md-4 d-flex align-items-center justify-content-end mx-20'>
          <FaRegUserCircle className='text-white fs-2' />
        </div>
        {/* <div className="row w-100 input-group">
            <input type="text" onKeyUp={termino} className="col-8 col-md-8 form-control" placeholder="Buscar contenido" />
            <button className="col-4 col-md-4" type="button" id="button-addon2"><CiSearch /></button>
        </div> */}
      </div>
      {eltermino.length >= 1 &&
        <div className='barra_busqueda'>
          <h4><CiSearch /> BUSCANDO: {eltermino}</h4>
        </div>
      }
    </>
  )
}
