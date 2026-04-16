"use client"
import { useState, useEffect } from 'react';
import { useThemeContext } from './context/theme';
import { BsChevronRight } from 'react-icons/bs';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { usuario, setUsuario } = useThemeContext();
  const [ loading, setLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ showErrorMessage, setShowErrorMessage ] = useState(false);
  const [ useInicio, setInicio ] = useState(false);

  const checkInicio = () => {
    setInicio(!useInicio);
  }

  useEffect(() => {
    if (errorMessage) {
      // Delay before showing the error message
      const showTimer = setTimeout(() => {
        setShowErrorMessage(true);
      }, 500);

      // Clear the error message after 3 seconds
      const clearTimer = setTimeout(() => {
        setErrorMessage("");
        setShowErrorMessage(false);
      }, 3500);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(clearTimer);
      };
    } else {
      setShowErrorMessage(false);
    }
  }, [errorMessage]);

  const registro = (e: any) => {
    e.preventDefault();
    setLoading(true);
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
        if (data.results.length > 0) {
          console.log('RESULTADOS: ', data.results[0]);
          setUsuario(data.results);
          setErrorMessage("¡BIENVENIDO!<br/>Ingresando a su cuenta");
          localStorage.setItem('usuarioEmail', data.results[0].email);
          localStorage.setItem('usuarioId', data.results[0].id);
          localStorage.setItem('usuarioTipo', data.results[0].tipo)
          router.push('/categorias');
        } else {
          setErrorMessage("Usuario y/o contraseña incorrectos");
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }

  return (
      <div className="flex justify-center items-center min-h-80 bg-[url('https://webinars.webinarsenconcreto.com/images/login.png')] bg-gray-700 bg-blend-multiply z-10 bg-cover bg-center bg-no-repeat">
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className='flex flex-col justify-center items-center p-4 rounded-lg shadow-lg z-20 text-white'>
          <h1 className='text-5xl text-center uppercase p-10'>
            {!useInicio ? (
              <>Una plataforma para profesionales<br />de la construcción con concreto</>
            ) : '¡Bienvenido a la plataforma educativa del IMCYC!'}
          </h1>
          <div className='w-full flex justify-center'>
            {!useInicio &&
              <button className='bg-black py-3 rounded-lg px-20 text-white text-2xl hover:bg-slate-950 font-bold' onClick={checkInicio}>INICIAR SESIÓN</button>
            }
          </div>
          {useInicio && (
            loading ? (
              <h5>Cargando...</h5>
            ) : (
            <div className='bg-gray-950 bg-opacity-20 p-5 w-full md:w-1/2 lg:w-1/3 mt-0 rounded-lg text-2xl'>
              {showErrorMessage && (
                <h5 dangerouslySetInnerHTML={{ __html: errorMessage }} />
              )}
              <form onSubmit={registro}>
                <div className='flex flex-col'>
                  <label className='flex items-center py-3'><BsChevronRight/> Correo electrónico:</label>
                  <input type="email" name='email' className="p-3 bg-black text-white" placeholder="correo@electronico.com" required />
                </div>
                <div className='flex flex-col'>
                  <label className='flex items-center py-3'><BsChevronRight/> Contraseña:</label>
                  <input type="password" name='password' className="p-3 bg-black text-white" required />
                </div>
                <button className='bg-slate-800 py-3 rounded-lg px-10 text-white text-2xl hover:bg-slate-950 font-bold my-3 w-full' type="submit">INGRESAR A SU CUENTA</button>
              </form>

            </div>
            )
          )}
          </div>
        </div>
      </div>
  )
}
