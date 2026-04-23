import { ThemeContextProvider } from './context/theme'
import './globals.css'
import Footer from './components/Footer'
import FixedHeader from './components/FixedHeader'

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
        <div>
            <ThemeContextProvider>
              <FixedHeader />
                {children}
              <Footer />
            </ThemeContextProvider>
        </div>
      </body>
    </html>
  )
}
