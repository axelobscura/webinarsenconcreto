import Image from 'next/image';
import Link from 'next/link';

export default function FixedHeader() {

  return (
    <div className='fixed top-0 left-0 z-50 flex w-full py-1 text-white shadow bg-gray-950 bg-opacity-20'>
      <div className='flex flex-row w-full px-2 py-2'>
        <div className='px-1'>
          <Link href='/categorias' className='block'>
            <Image
              src="/imcyc_registrada.svg"
              alt="Webinars en concreto instituto mexicano del cemento y del concreto"
              width="100"
              height="100"
            />
          </Link>
        </div>
        <div className='flex items-center ml-2'>
          <p className='text-white text-1xl'>| Plataforma Educativa</p>
        </div>
      </div>
    </div>
  )
}
