import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {AuthProvider} from './src/global/context';
import {AppRoutes} from './src/global/routes';
import {CreateUserProvider} from './src/global/context/createUserAuth';
import {CartProvider} from './src/global/context/Cart';
import {RedefinePasswordProvider} from './src/global/context/RedefinePassword';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
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
