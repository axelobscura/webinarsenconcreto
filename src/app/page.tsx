"use client"
import { useState, useEffect } from 'react';
import { useThemeContext } from './context/theme';
import Image from 'next/image';
import { Inter } from 'next/font/google'
import { BsChevronRight } from 'react-icons/bs';
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { usuario, setUsuario } = useThemeContext();

  const registro = (e: any) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let user = {
      email: email,
      password: password,
    }
    async function fetchData() {
      try {
        const response = await fetch(`/api/usuarios/${JSON.stringify(user)}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log('DATA: ', data);
        if (data.results.length > 0) {
          console.log('RESULTADOS: ', data.results[0]);
          setUsuario(data.results);
          localStorage.setItem('usuarioEmail', data.results[0].email);
          localStorage.setItem('usuarioId', data.results[0].id);
          localStorage.setItem('usuarioTipo', data.results[0].tipo)
          router.push('/categorias');
        } else {
          alert("Usuario y/o contraseña incorrectos");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }

  return (
      <div className='branding'>
        <Image
            src="/imcyc_registrada.svg"
            alt="Webinars en concreto instituto mexicano del cemento y del concreto"
            width="180"
            height="100"
        />
        <h1>Plataforma Educativa</h1>
        <h3>COMPARTIR EL CONOCIMIENTO</h3>
        <h5>Una plataforma para profesionales<br/>de la construcción con concreto</h5>
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
        </div>
      </div>
  )
}
