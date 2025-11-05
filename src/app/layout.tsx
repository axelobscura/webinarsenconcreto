import { ThemeContextProvider } from './context/theme'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import Footer from './components/Footer';

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
      <body>
        <div className='container-fluid login footer'>
          <div className='branding'>
            <ThemeContextProvider>
              {children}
            </ThemeContextProvider>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
