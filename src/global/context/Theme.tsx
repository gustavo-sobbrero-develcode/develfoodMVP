import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}
interface Props {
  themeSelect: string;
  setThemeSelect: (themeSelect: string) => void;
  SetDeviceTheme: (theme: string) => void;
  GetDeviceTheme: () => void;
}

const themeUser = createContext({
  themeSelect: 'default',
  setThemeSelect: () => {},
  SetDeviceTheme: () => {},
  GetDeviceTheme: () => {},
} as Props);

function ThemeProviderContext({children}: ThemeProviderProps) {
  const [themeSelect, setThemeSelect] = useState('default');

  async function SetDeviceTheme(theme: string) {
    await AsyncStorage.setItem('@deviceTheme', theme);
    setThemeSelect(theme);
  }

  async function GetDeviceTheme() {
    const deviceTheme = await AsyncStorage.getItem('@deviceTheme');
    setThemeSelect(deviceTheme === null ? 'default' : deviceTheme);
  }

  return (
    <themeUser.Provider
      value={{setThemeSelect, themeSelect, SetDeviceTheme, GetDeviceTheme}}>
      {children}
    </themeUser.Provider>
  );
}

function useThemeProvider() {
  const Context = useContext(themeUser);

  return Context;
}

export {useThemeProvider, ThemeProviderContext};
