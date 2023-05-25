import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CiSearch } from 'react-icons/ci';

export default function Header() {
  const [eltermino, setEltermino] = useState('');

  const termino = (e: any) => {
    setEltermino(e.target.value);
  }

  console.log(eltermino);

  return (
    <>
      <div className='topBar'>
        <Link href="/">
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
        <div className="input-group">
            <input type="text" onKeyUp={termino} className="form-control" placeholder="Buscar contenido" />
            <button className="btn btn-outline-secondary m-0 p-2" type="button" id="button-addon2"><CiSearch /></button>
        </div>
      </div>
      {eltermino.length >= 1 &&
        <div className='barra_busqueda'>
          <h4><CiSearch /> BUSCANDO: {eltermino}</h4>
        </div>
      }
    </>
  )
}
