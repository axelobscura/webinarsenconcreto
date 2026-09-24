import Image from 'next/image';
import Link from 'next/link';

const patrocinadores = [
  { href: 'https://www.cemex.com', src: '/logos/logo_cemex.svg', width: 150, height: 50 },
  { href: 'https://www.moctezuma.com', src: '/logos/logo_moctezuma.svg', width: 150, height: 30 },
  { href: 'https://www.fortaleza.com', src: '/logos/logo_fortaleza.svg', width: 70, height: 40 },
  { href: 'https://www.chihuahua.com', src: '/logos/logo_chihuahua.svg', width: 100, height: 50 },
  { href: 'https://www.holcim.com', src: '/logos/logo_holcim.svg', width: 150, height: 50 },
  { href: 'https://www.cruzazul.com', src: '/logos/logo_cruzazul.svg', width: 150, height: 55 },
];

export default function Footer() {

  return (
    <footer className='relative z-10 text-white bg-ink'>
      <div className='h-1.5 bh-stripe' />
      <div className='grid grid-cols-1 gap-8 px-5 py-10 sm:px-10 lg:grid-cols-[auto_1fr] items-center'>
        <div className='flex items-center gap-4'>
          <span className='flex gap-1.5' aria-hidden>
            <span className='w-5 h-5 rounded-full bg-cobalt' />
            <span className='w-5 h-5 bg-mist bh-triangle' />
            <span className='w-5 h-5 bg-steel' />
          </span>
          <p className='text-xs font-bold tracking-[0.3em] uppercase'>Nuestros Asociados</p>
        </div>
        <div className='flex flex-wrap items-center gap-x-8 gap-y-6 lg:justify-end'>
          {patrocinadores.map((p) => (
            <Link key={p.href} href={p.href} target="_blank" className='transition opacity-70 hover:opacity-100'>
              <Image src={p.src} alt="Webinars en concreto instituto mexicano del cemento y del Concreto A.C." width={p.width} height={p.height} />
            </Link>
          ))}
        </div>
      </div>
      <div className='px-5 py-4 border-t border-white/20 sm:px-10'>
        <p className='text-xs tracking-widest uppercase text-white/60'>© 1959 - 2026 Instituto Mexicano del Cemento y del Concreto A.C.</p>
      </div>
    </footer>
  )
}
