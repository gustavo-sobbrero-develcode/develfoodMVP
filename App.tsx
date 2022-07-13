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
import {RedefinePasswordProvider} from './src/global/Context/RedefinePassword';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <CartProvider>
          <RedefinePasswordProvider>
            <CreateUserProvider>
              <ThemeProvider theme={theme}>
                <NavigationContainer>
                  <AppRoutes />
                </NavigationContainer>
              </ThemeProvider>
            </CreateUserProvider>
          </RedefinePasswordProvider>
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
