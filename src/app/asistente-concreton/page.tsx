"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeContext } from '../context/theme';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export default function AsistenteConcreton() {
  const { usuario, setUsuario } = useThemeContext();
  const [isLoading, setIsLoading] = useState(false);
  const [usePompt, setPompt] = useState<string | null>(null);
  const [useRespuesta, setRespuesta] = useState<any[]>([]);
  const [choices, setChoices] = useState<any[]>([]);

  async function fetchData() {
    setIsLoading(true);
    const res = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: usePompt,
      }),
    });
    setIsLoading(false);
    const apiData = await res.json();
    setRespuesta(apiData);
    setChoices(apiData.choices);
  };

  const consultaAi  = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const consulta = formData.get('consulta') as string | null;
    setPompt(consulta);
    fetchData();
  };

  console.log(usuario);
  console.log(useRespuesta);

  return (
    <div
        className={`flex flex-col justify-center items-center min-h-full bg-[url('https://webinars.webinarsenconcreto.com/images/bkg_contenidos.jpg')] bg-gray-900 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat`}
      >
        <div className='flex flex-col items-center justify-center w-full'>
          <Image
            src={`/concreton.webp`}
            alt=""
            width={150}
            height={90}
            className='object-cover mb-5'
          />
          <h2 className='text-4xl font-bold text-white'>ASISTENTE CONCRETÓN</h2>
          <p className='text-white'>Instituto Mexicano del Cemento y del Concreto A.C.</p>
        </div>
        <div className='grid grid-cols-[1fr_1fr] bg-white bg-opacity-30 rounded-lg shadow-lg p-3 w-full max-w-4xl mt-5'>
          <div>
            <p className='font-bold text-white uppercase'>Créditos Disponibles: 300</p>
          </div>
          <div>
            <p className='font-bold text-white uppercase'>Créditos Utilizados: 0</p>
          </div>
        </div>
        <div className='grid max-w-4xl grid-cols-1 text-center'>
          <p className='mt-5 text-white text-1xl'>¡Bienvenido al Asistente Concretón! Aquí podrás interactuar con nuestro asistente de inteligencia artificial para obtener respuestas a tus preguntas sobre el cemento y el concreto. Simplemente ingresa tu consulta y el Asistente Concretón te proporcionará información precisa y útil. ¡Comienza a explorar el mundo del cemento y el concreto con nosotros!</p>
        </div>
        <div className='grid max-w-4xl grid-cols-1 text-center'>
          <div>
            <form 
              className='grid grid-cols-[3fr_1fr] gap-2 items-center justify-center w-full max-w-4xl mt-5'
              onSubmit={consultaAi}
            >
              <input type="text" name='consulta' className="w-full p-3 px-5 text-2xl font-bold text-black bg-white border bg-opacity-90 border-slate-500 rounded-2xl" placeholder="Escribe tu consulta aquí..." required />
              <button className='w-full px-10 py-4 my-3 font-bold text-white border text-1xl bg-slate-800 hover:bg-slate-950 rounded-2xl' type="submit">
                {isLoading && useRespuesta.length > 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="30 30"
                      strokeLinecap="round"
                      strokeOpacity="0.3"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="30 150"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                ENVIAR CONSULTA
              </button>
            </form>
          </div>
        </div>
        <div className='p-5 mb-5 bg-black rounded-2xl bg-opacity-70'>
          {choices && choices.length > 0 && (
            <div className='grid max-w-4xl grid-cols-1 m-5 text-center'>
              <h3 className='mb-5 text-2xl font-bold text-white'>Respuesta del Asistente Concretón:</h3>
              <div className='text-left text-white'>
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    pre: ({ node, ...props }) => (
                      <pre className='text-4xl font-bold' {...props} />
                    ),
                    code: ({ node, className, children, ...props }) => (
                      <code className={`font-bold text-4xl ${className ?? ''}`} {...props}>{children}</code>
                    ),
                  }}
                >
                  {choices[0].message.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
