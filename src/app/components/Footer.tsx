import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {

  return (
    <div className='footer d-flex flex-column align-items-center bg-dark py-2'>
      <div className='row w-100'>
        <div className='col-8 offset-2 d-flex justify-content-center text-center'>
            <Link href="https://www.cemex.com" target="_blank" className='mx-3'>
              <Image src="/logos/logo_cemex.svg" alt="Webinars en concreto instituto mexicano del cemento y del Concreto A.C." width="150" height="50" />
            </Link>
            <Link href="https://www.moctezuma.com" target="_blank" className='mx-3 pt-2'>
              <Image src="/logos/logo_moctezuma.svg" alt="Webinars en concreto instituto mexicano del cemento y del Concreto A.C." width="150" height="30" />
            </Link>
            <Link href="https://www.fortaleza.com" target="_blank">
              <Image src="/logos/logo_fortaleza.svg" alt="Webinars en concreto instituto mexicano del cemento y del Concreto A.C." width="70" height="40" />
            </Link>
            <Link href="https://www.chihuahua.com" target="_blank" className='mx-3'>
              <Image src="/logos/logo_chihuahua.svg" alt="Webinars en concreto instituto mexicano del cemento y del Concreto A.C." width="100" height="50" />
            </Link>
            <Link href="https://www.holcim.com" target="_blank" className='mx-2'>
              <Image src="/logos/logo_holcim.svg" alt="Webinars en concreto instituto mexicano del cemento y del Concreto A.C." width="150" height="50" />
            </Link>
            <Link href="https://www.cruzazul.com" target="_blank" className='mx-2'>
              <Image src="/logos/logo_cruzazul.svg" alt="Webinars en concreto instituto mexicano del cemento y del Concreto A.C." width="150" height="55" />
            </Link>
        </div>
      </div>
      <div className='row w-100'>
        <p className='text-center p-0 mt-0 text-white w-100 font-xs fs-6 mb-0'><small>© 1959 - 2025 Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
      </div>
    </div>
  )
}
