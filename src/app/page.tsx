import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="container-fluid login">
      <div className='branding'>
        <Image
            src="/imcyc_registrada.svg"
            alt="Webinars en concreto instituto mexicano del cemento y del concreto"
            width="180"
            height="100"
        />
        <h1>Plataforma Educativa</h1>
        <p><small>Instituto Mexicano del Cemento y del Concreto A.C.</small></p>
      </div>
    </div>
  )
}
