"use client"
import { useState, useEffect } from 'react';
import LoaderImcyc from '../components/LoaderImcyc';
import Image from 'next/image';

export default function LideresDeLaConstruccion() {
  const [useConcreton, setConcreton] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/getconcreton');
      const apiData = await res.json();
      setConcreton(apiData.results);
    }
    fetchData();
  }, []);

  if(!useConcreton || useConcreton.length === 0){
    return(
      <LoaderImcyc />
    )
  };

  return (
    <div
        className={`flex justify-center items-center min-h-full bg-[url('https://webinars.webinarsenconcreto.com/images/bkg_contenidos.jpg')] bg-gray-700 bg-blend-multiply bg-opacity-30 z-10 bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] w-full p-10 pt-36'>
          <div className='flex flex-col w-fullp-10'>
            <h2 className='font-bold text-left text-white text-[2rem] sm:text-[4rem] border-b border-white mb-4 uppercase leading-[3.5rem] py-5'>Concretón</h2>
            <p className="text-4xl font-bold text-white">Problemas, Causas y Soluciones</p>
          </div>
          <div className='grid w-full grid-cols-1 gap-3 p-3 sm:grid-cols-5'>
            {useConcreton && useConcreton.map((concreton) => (
              <div key={concreton.id} className='bg-black bg-opacity-50 rounded-lg'>
                <Image
                  src={`https://www.webinarsenconcreto.com/imcyc/concreton/2017/${concreton.imagen}`}
                  alt={concreton.norma}
                  width={400}
                  height={400}
                  className='object-cover mb-2 rounded-lg shadow-lg'
                />
                <h3 className='p-3 font-bold leading-7 text-center text-white text-1xl hover:text-gray-950'>{concreton.norma}</h3>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
