import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useAuth} from '../context';
import {AuthedRoutes} from './authedroutes.routes';
import {AuthRoutes} from './authroutes.routes';

export function AppRoutes() {
  const {token} = useAuth();

  useEffect(() => {
    setTimeout(() => {
      token !== undefined && RNBootSplash.hide({fade: true});
    }, 500);
  }, []);

  return token !== undefined ? <AuthedRoutes /> : <AuthRoutes />;
}
