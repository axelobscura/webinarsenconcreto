import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CiSearch } from 'react-icons/ci';
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  const [eltermino, setEltermino] = useState('');

  const termino = (e: any) => {
    setEltermino(e.target.value);
  }

  return (
    <>
      <div className='topBar d-flex align-items-center'>
        <div className='col-8 col-md-8 d-flex align-items-center'>
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
          <span className='text-white ms-2 fs-2'>| Platafroma Educativa</span>
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
