import { ThemeContextProvider } from './context/theme'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import Footer from './components/Footer'

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
    <html lang="es">
      <body>
        <div className='container-fluid login'>
            <ThemeContextProvider>
              {children}
            </ThemeContextProvider>
            <Footer />
        </div>
      </body>
    </html>
  )
}
