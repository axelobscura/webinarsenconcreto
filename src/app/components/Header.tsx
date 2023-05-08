import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'

export default function Header() {
  return (
      <div className='topBar'>
        <Image
          src="/imcyc_registrada.svg"
          alt="Webinars en concreto instituto mexicano del cemento y del concreto"
          width="150"
          height="70"
          style={{
            marginLeft: '-12px'
          }}
        />
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Buscar contenido" />
            <button className="btn btn-outline-secondary m-0 p-2" type="button" id="button-addon2"><CiSearch /></button>
        </div>
      </div>
  )
}
