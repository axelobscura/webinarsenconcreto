import Image from 'next/image';
import Link from 'next/link';

export default function FixedHeader() {

  return (
    <div className='fixed top-0 left-0 z-50 flex w-full bg-gray-950 bg-opacity-20 py-1 shadow text-white'>
      <div className='flex w-full flex-row py-2 px-2'>
        <div className='px-1'>
          <Link href='/categorias' className='block'>
            <Image
              src="/imcyc_registrada.svg"
              alt="Webinars en concreto instituto mexicano del cemento y del concreto"
              width="80"
              height="80"
            />
          </Link>
        </div>
        <div className='flex items-center ml-2'>
          <p className='text-white text-2xl'>| Plataforma Educativa</p>
        </div>
      </div>
    </div>
  )
}
