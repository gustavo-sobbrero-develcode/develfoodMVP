import React, {createContext, useState} from 'react';
import {useContext} from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}
interface Props {
  themeSelect: string;
  setThemeSelect: (themeSelect: string) => void;
}

const themeUser = createContext({
  themeSelect: 'default',
  setThemeSelect: () => {},
} as Props);

function ThemeProviderContext({children}: ThemeProviderProps) {
  const [themeSelect, setThemeSelect] = useState('default');

  return (
    <themeUser.Provider value={{setThemeSelect, themeSelect}}>
      {children}
    </themeUser.Provider>
  );
}

function useThemeProvider() {
  const Context = useContext(themeUser);

  return Context;
}

export {useThemeProvider, ThemeProviderContext};
