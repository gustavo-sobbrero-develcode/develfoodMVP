import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home} from '@screens/Home';
import {Favorites} from '@screens/Favorites';
import {Settings} from '@screens/Settings';
import {TabBarButton} from '@components/TabBarButton';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useCreateCart} from '../context/Cart';
import {CartComponent} from '@components/CartComponent';
import {Orders} from '@screens/Orders';

const Tabs = createBottomTabNavigator();

export function Routes() {
  const theme = useTheme();

  const navigation = useNavigation();

  const {totalItems} = useCreateCart();

  function handlerCheckoutScreen() {
    navigation.navigate('Checkout' as never);
  }

  return (
    <>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            position: 'absolute',
            height: RFValue(Platform.OS === 'ios' ? 50 : 50),
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}>
        <Tabs.Screen
          name="Inicio"
          component={Home}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <TabBarButton
                isPressed={focused}
                name={'Inicio'}
                source={theme.icons.home}
                onPressed={() => navigation.navigate('Inicio' as never)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Favoritos"
          component={Favorites}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <TabBarButton
                isPressed={focused}
                name={'Favoritos'}
                source={theme.icons.favoriteRestaurant}
                onPressed={() => navigation.navigate('Favoritos' as never)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Orders"
          component={Orders}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <TabBarButton
                isPressed={focused}
                name={'Pedidos'}
                source={theme.icons.deliverylist}
                onPressed={() => navigation.navigate('Orders' as never)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Perfil"
          component={Settings}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarButton
                isPressed={focused}
                name={'Perfil'}
                source={theme.icons.profile}
                onPressed={() => navigation.navigate('Perfil' as never)}
              />
            ),
          }}
        />
      </Tabs.Navigator>
      {/* <TabBar /> */}
      {totalItems > 0 && (
        <CartComponent BottomBar onPress={handlerCheckoutScreen} />
      )}
    </>
  );
}
