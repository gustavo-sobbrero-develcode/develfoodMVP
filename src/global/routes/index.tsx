import {useThemeProvider} from '@global/context/Theme';
import themes from '@global/styles/themes';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {ThemeProvider} from 'styled-components/native';
import {useAuth} from '../context';
import {AuthedRoutes} from './authedroutes.routes';
import {AuthRoutes} from './authroutes.routes';

export function AppRoutes() {
  const {token} = useAuth();
  const {themeSelect} = useThemeProvider();
  const defaultTheme = useColorScheme();
  const {GetDeviceTheme} = useThemeProvider();

  const theme = themes[defaultTheme] || themes.light;

  function getStatusImage(themeSet: string) {
    const themeSetted = {
      default: theme,
      light: themes.light,
      dark: themes.dark,
    }[themeSet];
    return themeSetted;
  }

  const themeSetted = getStatusImage(themeSelect);

  useEffect(() => {
    GetDeviceTheme();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      token !== undefined && RNBootSplash.hide({fade: true});
    }, 500);
  }, []);

  return token !== undefined ? (
    <ThemeProvider theme={themeSetted}>
      <AuthedRoutes />
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={themeSetted}>
      <AuthRoutes />
    </ThemeProvider>
  );
}
