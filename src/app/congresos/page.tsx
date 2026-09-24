"use client"
import Link from 'next/link';
import Image from 'next/image';
import { StickyHeading, acento } from '../components/Bauhaus';
import { congresos } from '../data/congresos';

export default function LideresDeLaConstruccion() {

  return (
    <div className='min-h-screen w-full bg-paper text-ink pt-[72px]'>
      <StickyHeading eyebrow='Valor agregado' titulo='Encuentros del Cemento y del Concreto' />
      <div className='w-full px-5 pt-10 pb-20 sm:px-10'>
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
          {congresos && congresos.map((item, index) => (
            <Link href={`/congresos/${item.slug}`} key={item.id} className='flex flex-col overflow-hidden bh-card-link group'>
              <div className='aspect-square overflow-hidden border-b-[3px] border-ink bg-ink'>
                <Image
                  src={item.foto}
                  alt={item.nombre}
                  width={400}
                  height={400}
                  className='object-cover object-top w-full h-full transition duration-500 group-hover:grayscale'
                />
              </div>
              <div className='flex items-start flex-1 gap-3 p-4'>
                <span className={`mt-1 shrink-0 w-3 h-3 ${acento(index).bg}`} />
                <h3 className='text-sm font-bold leading-snug uppercase'>{item.nombre}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
