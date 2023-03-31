import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { BsChevronRight } from 'react-icons/bs';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="container-fluid login">
      <div className='branding'>
        <Image
            src="/imcyc_registrada.svg"
            alt="Webinars en concreto instituto mexicano del cemento y del concreto"
            width="180"
            height="100"
        />
        <h1>Plataforma Educativa</h1>
        <h3>Compartir el Conocimiento</h3>
        
        <div className='login-form'>
          <div>
            <label className="form-label"><BsChevronRight/> Correo electrónico:</label>
            <input type="email" className="form-control" placeholder="name@example.com" />
          </div>
          <div>
            <label className="form-label"><BsChevronRight/> Contraseña:</label>
            <input type="password" className="form-control" />
          </div>
          <Link href="/categorias">
            <button type="button" className="btn">INGRESAR A SU CUENTA</button>
          </Link>
          <p style={{
            textAlign: 'center',
            fontSize: '0.7rem',
          }}>
            Instituto mexicano del Cemento y del Concreto A.C.
          </p>
        </div>
        
      </div>
    </div>
  )
}
