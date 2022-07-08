import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RestaurantProfile} from '../../screens/RestaurantProfile';
import {Routes} from './routes.routes';
import {CartComponent} from '../../components/CartComponent';
import {Checkout} from '../../screens/Checkout';
import {CheckoutSuccess} from '../../screens/CheckoutSuccess';
import {OrderInfo} from '../../screens/OrderInfo';

const {Navigator, Screen} = createStackNavigator();

export function AuthedRoutes() {
  return (
    <>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Home" component={Routes} />
        <Screen name="RestaurantProfile" component={RestaurantProfile} />
        <Screen name="CartComponent" component={CartComponent} />
        <Screen name="Checkout" component={Checkout} />
        <Screen name="CheckoutSuccess" component={CheckoutSuccess} />
        <Screen name="OrderInfo" component={OrderInfo} />
      </Navigator>
    </>
  );
}
