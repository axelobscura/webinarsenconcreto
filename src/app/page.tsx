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
      <div
        className={`flex justify-center items-center min-h-80 ${
          !useInicio
            ? "bg-[url('https://webinars.webinarsenconcreto.com/images/login.png')]"
            : "bg-[url('https://webinars.webinarsenconcreto.com/images/login2.png')]"
        } bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat`}
      >
        <div className='flex flex-col items-center justify-center w-full h-screen'>
          <div className='z-20 flex flex-col w-full p-4 text-white rounded-lg shadow-lg justify-left'>
          <h1 className='py-5 text-6xl text-left uppercase'>
            {!useInicio ? (
              <>Una plataforma para profesionales<br />de la construcción con concreto</>
            ) : 'Iniciar sesión'}
          </h1>
          <div className='flex w-full'>
            {!useInicio &&
              <button className='px-20 py-3 text-2xl font-bold text-white bg-transparent border border-white hover:bg-slate-950 rounded-3xl' onClick={checkInicio}>INICIAR SESIÓN</button>
            }
          </div>
          {useInicio && (
            loading ? (
              <h5>Cargando...</h5>
            ) : (
            <div className='w-full my-2 text-2xl md:w-1/2 lg:w-1/3'>
              {showErrorMessage && (
                <h5 dangerouslySetInnerHTML={{ __html: errorMessage }} />
              )}
              <form onSubmit={registro}>
                <div className='flex flex-col'>
                  <label className='flex items-center py-3'><BsChevronRight/> Correo electrónico:</label>
                  <input type="email" name='email' className="p-2 px-5 text-gray-900 bg-white border bg-opacity-70 border-slate-500 rounded-2xl" placeholder="correo@electronico.com" required />
                </div>
                <div className='flex flex-col'>
                  <label className='flex items-center py-3'><BsChevronRight/> Contraseña:</label>
                  <input type="password" name='password' className="p-2 px-5 text-gray-900 bg-white border bg-opacity-70 border-slate-500 rounded-2xl" required />
                </div>
                <button className='w-full px-10 py-3 my-3 mt-5 font-bold text-white text-1xl bg-slate-800 hover:bg-slate-950 rounded-2xl' type="submit">INGRESAR A SU CUENTA</button>
              </form>
            </div>
            )
          )}
          </div>
        </div>
      </div>
  )
}
