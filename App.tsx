import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';
import {useEffect} from 'react';
import {AuthProvider} from './src/global/context';
import {AppRoutes} from './src/global/routes';
import {CreateUserProvider} from './src/global/context/createUserAuth';
import {CartProvider} from './src/global/context/Cart';
import {RedefinePasswordProvider} from './src/global/context/RedefinePassword';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useColorScheme} from 'react-native';
import themes from '@global/styles/themes';

export default function App() {
  const defaultTheme = useColorScheme();

  const theme = themes[defaultTheme] || themes.light;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AuthProvider>
          <CartProvider>
            <RedefinePasswordProvider>
              <CreateUserProvider>
                <ThemeProvider theme={theme}>
                  <AppRoutes />
                </ThemeProvider>
              </CreateUserProvider>
            </RedefinePasswordProvider>
          </CartProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
