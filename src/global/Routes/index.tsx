import React from 'react';
import {useAuth} from '../Context';
import {AuthedRoutes} from './authedroutes.routes';
import {AuthRoutes} from './authroutes.routes';

export function AppRoutes() {
  const {token} = useAuth();

  return token ? <AuthedRoutes /> : <AuthRoutes />;
}
