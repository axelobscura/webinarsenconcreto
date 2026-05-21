"use client"
import { useState } from 'react';
import Image from 'next/image';
import { useThemeContext } from '../context/theme';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import LoaderConcreton from '../components/LoaderConcreton';

export default function AsistenteConcreton() {
  const { usuario, setUsuario } = useThemeContext();
  const [isLoading, setIsLoading] = useState(false);
  const [useRespuesta, setRespuesta] = useState<any>("");
  const [choices, setChoices] = useState<any[]>([]);

  async function fetchData(consulta: string | null) {
    const prompt = consulta?.trim() || "";
    const endpoint = prompt
      ? `/api/chatgpt?prompt=${encodeURIComponent(prompt)}`
      : "/api/chatgpt";

    setIsLoading(true);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log(res);
    const apiData = await res.json();
    setIsLoading(false);
    console.log(apiData);
    setRespuesta(apiData.answer);
    setChoices(apiData.answer ? [{ text: apiData.answer }] : []);
  };

  const consultaAi  = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const consulta = formData.get('consulta') as string | null;
    fetchData(consulta);
  };

  return (
    <div
        className={`flex flex-col min-h-screen justify-center items-center bg-[url('https://webinars.webinarsenconcreto.com/images/bkg_contenidos.jpg')] bg-gray-900 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <div className='flex flex-col items-center justify-center w-full mt-32'>
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
              <button className='flex items-center w-full gap-3 px-8 py-4 font-bold text-white border text-1xl bg-slate-800 hover:bg-slate-950 rounded-2xl' type="submit">
                {isLoading && <LoaderConcreton />}
                {!isLoading ? "ENVIAR CONSULTA" : "CARGANDO..."}
              </button>
            </form>
          </div>
        </div>
        <div className='w-full max-w-6xl p-5 mt-5 mb-5 bg-black rounded-2xl bg-opacity-70'>
          {choices && choices.length > 0 && (
            <div className='grid max-w-6xl grid-cols-1 m-5 text-center'>
              <h3 className='mb-5 text-2xl font-bold text-white'>Respuesta del Asistente Concretón:</h3>
              <div className='text-left text-white chatopt'>
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
                  {useRespuesta ? useRespuesta : "No se recibió una respuesta del asistente."}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
