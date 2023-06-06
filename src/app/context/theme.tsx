'use client';
import { createContext, useContext, useState } from "react";

interface MyContextType {
  usuario: string | undefined;
  setUsuario: any;
};

const ThemeContext = createContext<MyContextType>({
  usuario: '',
  setUsuario: '',
})

export const ThemeContextProvider = ({ children }: { children : any }) => {
    const [usuario, setUsuario] = useState();
    return (
      <ThemeContext.Provider value={{ usuario, setUsuario }}>
          {children}
      </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);