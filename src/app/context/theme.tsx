'use client';
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"
import LoaderImcyc from "../components/LoaderImcyc";

export interface Usuario {
  id: number | string;
  email: string;
  tipo: string;
}

interface MyContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
  pathname: string | undefined;
};

// Rutas accesibles sin sesión; todo lo demás requiere iniciar sesión.
const RUTAS_PUBLICAS = ['/'];

// Se conservan las mismas llaves que ya usaba la app para no cerrar sesiones existentes.
const LLAVES = { email: 'usuarioEmail', id: 'usuarioId', tipo: 'usuarioTipo' };

function leerSesion(): Usuario | null {
  try {
    const email = localStorage.getItem(LLAVES.email);
    const id = localStorage.getItem(LLAVES.id);
    if (!email || !id) return null;
    return { id, email, tipo: localStorage.getItem(LLAVES.tipo) ?? '' };
  } catch {
    return null;
  }
}

function guardarSesion(usuario: Usuario | null) {
  try {
    if (usuario) {
      localStorage.setItem(LLAVES.email, usuario.email);
      localStorage.setItem(LLAVES.id, String(usuario.id));
      localStorage.setItem(LLAVES.tipo, usuario.tipo ?? '');
    } else {
      Object.values(LLAVES).forEach((llave) => localStorage.removeItem(llave));
    }
  } catch {
    // Sin acceso a localStorage (modo privado, etc.): la sesión vive solo en memoria.
  }
}

const ThemeContext = createContext<MyContextType>({
  usuario: null,
  login: () => {},
  logout: () => {},
  pathname: '',
})

export const ThemeContextProvider = ({ children }: { children : any }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [listo, setListo] = useState(false);
    const pathname = usePathname()
    const router = useRouter()
    const esPublica = RUTAS_PUBLICAS.includes(pathname ?? '/');

    useEffect(() => {
      setUsuario(leerSesion());
      setListo(true);

      // Mantiene la sesión sincronizada entre pestañas.
      const alCambiar = (e: StorageEvent) => {
        if (!e.key || Object.values(LLAVES).includes(e.key)) setUsuario(leerSesion());
      };
      window.addEventListener('storage', alCambiar);
      return () => window.removeEventListener('storage', alCambiar);
    }, []);

    useEffect(() => {
      if (!listo) return;
      if (!usuario && !esPublica) router.replace('/');
      if (usuario && pathname === '/') router.replace('/categorias');
    }, [listo, usuario, esPublica, pathname, router]);

    const login = useCallback((nuevo: Usuario) => {
      guardarSesion(nuevo);
      setUsuario(nuevo);
    }, []);

    const logout = useCallback(() => {
      guardarSesion(null);
      setUsuario(null);
      router.replace('/');
    }, [router]);

    // Evita mostrar contenido protegido mientras se verifica o redirige.
    const bloqueado = !listo || (!usuario && !esPublica) || (usuario && pathname === '/');

    return (
      <ThemeContext.Provider value={{ usuario, login, logout, pathname }}>
          {bloqueado ? <LoaderImcyc /> : children}
      </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);
