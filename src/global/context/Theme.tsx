import React, {createContext, useState} from 'react';
import {useContext} from 'react';

interface ThemeProps {
  children: React.ReactNode;
}
interface Props {
  themeSetted: boolean;
  setThemeSetted: (theme: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext({
  themeSetted: false,
  setThemeSetted: () => {},
  toggleTheme: () => {},
} as Props);

function ThemeContextProvider({children}: ThemeProps) {
  const [themeSetted, setThemeSetted] = useState(false);

  function toggleTheme() {
    setThemeSetted(!themeSetted);
    console.log('toggleTheme', themeSetted);
  }

  return (
    <ThemeContext.Provider value={{themeSetted, toggleTheme, setThemeSetted}}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const Context = useContext(ThemeContext);

  return Context;
}

export {useThemeContext, ThemeContextProvider};
