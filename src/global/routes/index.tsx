import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useAuth} from '../context';
import {AuthedRoutes} from './authedroutes.routes';
import {AuthRoutes} from './authroutes.routes';

export function AppRoutes() {
  const {token} = useAuth();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return token !== undefined ? <AuthedRoutes /> : <AuthRoutes />;
}
