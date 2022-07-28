import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import {useEffect} from 'react';
import {AuthProvider} from './src/global/context';
import {AppRoutes} from './src/global/routes';
import {CreateUserProvider} from './src/global/context/createUserAuth';
import {CartProvider} from './src/global/context/Cart';
import {RedefinePasswordProvider} from './src/global/context/RedefinePassword';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import darkTheme from '@global/styles/darkTheme';
import {Button} from 'react-native';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [darkThemeState, setDarkThemeState] = React.useState(true);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <CartProvider>
          <RedefinePasswordProvider>
            <CreateUserProvider>
              <ThemeProvider theme={darkThemeState ? darkTheme : theme}>
                <NavigationContainer>
                  <Button
                    title="Change Theme"
                    onPress={() => setDarkThemeState(!darkThemeState)}
                  />
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
