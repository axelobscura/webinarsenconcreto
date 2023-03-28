import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

export const metadata = {
  title: 'Webinars en concreto Instituto Mexicano del Cemento y del Concreto A.C.',
  description: 'Webinars en concreto Instituto Mexicano del Cemento y del Concreto A.C.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Webinars en concreto Instituto Mexicano del Cemento y del Concreto A.C.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
