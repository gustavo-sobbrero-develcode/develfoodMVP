import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RestaurantProfile} from '../../screens/RestaurantProfile';
import {Routes} from './routes.routes';
import {CartComponent} from '../../components/CartComponent';
import {Checkout} from '../../screens/Checkout';
import {CheckoutSuccess} from '../../screens/CheckoutSuccess';
import {OrderInfo} from '../../screens/OrderInfo';
import {CartProvider} from '../Context/Cart';

const {Navigator, Screen} = createNativeStackNavigator();

export function AuthedRoutes() {
  return (
    <>
      <CartProvider>
        <Navigator
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
          <Screen name="Home" component={Routes} />
          <Screen name="RestaurantProfile" component={RestaurantProfile} />
          <Screen name="CartComponent" component={CartComponent} />
          <Screen name="Checkout" component={Checkout} />
          <Screen name="CheckoutSuccess" component={CheckoutSuccess} />
          <Screen name="OrderInfo" component={OrderInfo} />
        </Navigator>
      </CartProvider>
    </>
  );
}
