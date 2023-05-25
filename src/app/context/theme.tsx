'use client';
import { createContext, useContext, useState } from "react";

interface MyContextType {
  usuario: string;
  setUsuario: any;
};

const ThemeContext = createContext<MyContextType>({
  usuario: 'red',
  setUsuario: '',
})

export const ThemeContextProvider = ({ children }: { children : any }) => {
    const [usuario, setUsuario] = useState('');
    return (
      <ThemeContext.Provider value={{ usuario, setUsuario }}>
          {children}
      </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);