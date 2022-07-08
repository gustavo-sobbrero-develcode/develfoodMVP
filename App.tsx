import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {useEffect} from 'react';
import {AuthProvider} from './src/global/Context';
import {AppRoutes} from './src/global/Routes';
import {CreateUserProvider} from './src/global/Context/createUserAuth';
import {CartProvider} from './src/global/Context/Cart';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <CreateUserProvider>
          <ThemeProvider theme={theme}>
            <NavigationContainer>
              <AppRoutes />
            </NavigationContainer>
          </ThemeProvider>
        </CreateUserProvider>
      </CartProvider>
    </AuthProvider>
  );
}
