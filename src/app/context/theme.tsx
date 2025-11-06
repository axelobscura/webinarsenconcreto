'use client';
import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation"

interface MyContextType {
  usuario: string | undefined;
  setUsuario: any;
  pathname: string | undefined;
};

const ThemeContext = createContext<MyContextType>({
  usuario: '',
  setUsuario: '',
  pathname: '',
})

export const ThemeContextProvider = ({ children }: { children : any }) => {
    const [usuario, setUsuario] = useState();
    const pathname = usePathname()
    return (
      <ThemeContext.Provider value={{ usuario, setUsuario, pathname }}>
          {children}
      </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);