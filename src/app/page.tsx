"use client"
import { useState } from 'react';
import { useThemeContext } from './context/theme';
import { BsChevronRight } from 'react-icons/bs';
import { useRouter } from "next/navigation";
import LoaderConcreton from './components/LoaderConcreton';

export default function Home() {
  const router = useRouter();
  const { login } = useThemeContext();
  const [ loading, setLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ useInicio, setInicio ] = useState(false);

  const checkInicio = () => {
    setErrorMessage("");
    setInicio(!useInicio);
  }

  const registro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const form = new FormData(e.currentTarget);
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.usuario) {
        setErrorMessage(data.message || "No fue posible iniciar sesión, intente más tarde");
        setLoading(false);
        return;
      }
      login(data.usuario);
      router.replace('/categorias');
    } catch (error) {
      console.error(error);
      setErrorMessage("No hay conexión con el servidor, intente más tarde");
      setLoading(false);
    }
  }

  return (
      <div className='grid min-h-screen grid-cols-1 bg-paper lg:grid-cols-2'>
        <div className='flex flex-col justify-center px-5 pb-16 pt-36 sm:px-10 lg:px-16'>
          <p className='mb-6 bh-eyebrow'>
            <span className='w-3 h-3 rounded-full bg-cobalt' /> Instituto Mexicano del Cemento y del Concreto
          </p>
          <h1 className='max-w-2xl text-[2.5rem] font-black leading-[0.95] tracking-tight uppercase hyphens-auto sm:text-6xl xl:text-7xl'>
            {!useInicio ? (
              <>Una plataforma para profesionales <span className='text-steel'>de la construcción</span> con <span className='text-cobalt'>concreto</span></>
            ) : 'Iniciar sesión'}
          </h1>
          {!useInicio &&
            <div className='mt-12'>
              <button className='text-white bh-btn bg-cobalt' onClick={checkInicio}>
                Iniciar sesión <BsChevronRight />
              </button>
            </div>
          }
          {useInicio && (
            <div className='w-full max-w-lg mt-10'>
              {errorMessage && (
                <p role='alert' className='flex items-center gap-3 p-4 mb-6 font-bold tracking-wider uppercase border-[3px] border-ink bg-mist'>
                  <span className='w-3 h-3 shrink-0 bg-cobalt' /> {errorMessage}
                </p>
              )}
              <form onSubmit={registro} className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='mb-2 bh-eyebrow'><span className='w-3 h-3 bg-navy' /> Correo electrónico</label>
                  <input id='email' type="email" name='email' autoComplete='username' className="bh-input" placeholder="correo@electronico.com" required disabled={loading} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='password' className='mb-2 bh-eyebrow'><span className='w-3 h-3 bg-mist bh-triangle' /> Contraseña</label>
                  <input id='password' type="password" name='password' autoComplete='current-password' className="bh-input" required disabled={loading} />
                </div>
                <button className='w-full mt-2 text-white bh-btn bg-cobalt disabled:opacity-70 disabled:pointer-events-none' type="submit" disabled={loading}>
                  {loading ? <>Ingresando <LoaderConcreton /></> : <>Ingresar a su cuenta <BsChevronRight /></>}
                </button>
                <button type="button" onClick={checkInicio} className='self-start text-sm font-bold tracking-widest uppercase underline underline-offset-4 decoration-2 hover:text-cobalt'>Regresar</button>
              </form>
            </div>
          )}
        </div>
        <div className='relative min-h-[420px] overflow-hidden bg-ink lg:min-h-screen' aria-hidden>
          <div
            className={`absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-60 ${
              !useInicio
                ? "bg-[url('https://webinars.webinarsenconcreto.com/images/login.png')]"
                : "bg-[url('https://webinars.webinarsenconcreto.com/images/login2.png')]"
            }`}
          />
          <div className='absolute rounded-full w-[70%] aspect-square -right-[15%] top-[18%] bg-cobalt opacity-90' />
          <div className='absolute w-[38%] aspect-square left-[10%] bottom-[12%] bg-steel opacity-90' />
          <div className='absolute w-[26%] aspect-square left-[38%] top-[20%] bg-mist bh-triangle' />
          <div className='absolute left-0 w-full h-3 bottom-[40%] bg-paper' />
          <div className='absolute top-0 h-full w-3 left-[62%] bg-paper' />
          <div className='absolute w-24 h-24 border-[10px] border-paper rounded-full right-[8%] bottom-[8%]' />
        </div>
      </div>
  )
}
