"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { BsChevronRight } from 'react-icons/bs';
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  const registro = (e: any) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    console.log(email);
    console.log(password);
    router.push("/categorias")
  }

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
          <form className='loginf' onSubmit={registro}>
            <div>
              <label className="form-label"><BsChevronRight/> Correo electrónico:</label>
              <input type="email" name='email' className="form-control" placeholder="correo@electronico.com" required />
            </div>
            <div>
              <label className="form-label"><BsChevronRight/> Contraseña:</label>
              <input type="password" name='password' className="form-control" required />
            </div>
            <button type="submit" className="btn">INGRESAR A SU CUENTA</button>
          </form>
          <p style={{
            textAlign: 'center',
            fontSize: '0.7rem',
          }}>
            © 1959 - 2023 Instituto mexicano del Cemento y del Concreto A.C.
          </p>
        </div>
        
      </div>
    </div>
  )
}
