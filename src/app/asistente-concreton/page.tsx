"use client"
import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import LoaderConcreton from '../components/LoaderConcreton';

export default function AsistenteConcreton() {
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
      method: "GET",
    });
    const apiData = await res.json();
    console.log("Respuesta de la API:", apiData);
    setIsLoading(false);
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
    <div className='bh-page'>
      <div className='max-w-5xl bh-container'>
        <div className='grid grid-cols-1 gap-8 pt-6 pb-10 mb-10 border-b-[3px] border-ink sm:grid-cols-[auto_1fr] items-center'>
          <div className='relative flex items-center justify-center w-40 h-40 border-[3px] border-ink rounded-full bg-mist shadow-hard'>
            <Image
              src={`/concreton.webp`}
              alt=""
              width={110}
              height={66}
              className='object-contain'
            />
          </div>
          <div>
            <p className='mb-4 bh-eyebrow'><span className='w-3 h-3 bg-cobalt' /> Inteligencia Artificial · IMCYC</p>
            <h1 className='bh-title'>Asistente Concretón</h1>
          </div>
        </div>
        <div className='grid grid-cols-2 mb-8 bh-card'>
          <div className='p-5 border-r-[3px] border-ink'>
            <p className='bh-eyebrow text-ink/60'>Créditos disponibles</p>
            <p className='text-4xl font-black text-navy'>300</p>
          </div>
          <div className='p-5'>
            <p className='bh-eyebrow text-ink/60'>Créditos utilizados</p>
            <p className='text-4xl font-black text-cobalt'>0</p>
          </div>
        </div>
        <p className='max-w-3xl mb-8 text-lg'>¡Bienvenido al Asistente Concretón! Aquí podrás interactuar con nuestro asistente de inteligencia artificial para obtener respuestas a tus preguntas sobre el cemento y el concreto. Simplemente ingresa tu consulta y el Asistente Concretón te proporcionará información precisa y útil. ¡Comienza a explorar el mundo del cemento y el concreto con nosotros!</p>
        <form 
          className='grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]'
          onSubmit={consultaAi}
        >
          <input type="text" name='consulta' className="text-xl font-medium bh-input" placeholder="Escribe tu consulta aquí..." required />
          <button className='text-white bh-btn bg-navy' type="submit">
            {isLoading && <LoaderConcreton />}
            {!isLoading ? "Enviar consulta" : "Cargando..."}
          </button>
        </form>
        {choices && choices.length > 0 && (
          <div className='mt-10 overflow-hidden bh-card'>
            <h3 className='flex items-center gap-3 px-6 py-4 text-sm font-bold tracking-[0.3em] text-white uppercase bg-ink'>
              <span className='w-3 h-3 rounded-full bg-mist' /> Respuesta del Asistente Concretón
            </h3>
            <div className='p-6 text-left chatopt'>
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  pre: ({ node, ...props }) => (
                    <pre className='p-4 overflow-x-auto text-sm text-white bg-ink' {...props} />
                  ),
                  code: ({ node, className, children, ...props }) => (
                    <code className={`font-mono ${className ?? ''}`} {...props}>{children}</code>
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
