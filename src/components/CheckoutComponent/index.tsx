import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTheme} from 'styled-components';
import {useCreateCart} from '@global/context/Cart';
import {
  Container,
  CheckoutButton,
  DollarIcon,
  EndOrder,
  TotalPrice,
  Load,
  View,
  View2,
  View3,
} from './styles';
import axios from 'axios';

interface Props {
  loading?: boolean;
}

export function CheckoutComponent({loading}: Props) {
  const theme = useTheme();

  const navigation = useNavigation();

  const {total, userRequestCheckout, clearCart} = useCreateCart();

  function priceConverter() {
    const priceWZeros = parseFloat(total.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }
  const priceFormatted = priceConverter();

  const postOrder = async () => {
    await axios
      .post('http://192.168.0.65:9001/develfood/order', {
        counter: 9,
        restaurantId: '123',
        userId: '12322',
        createdAt: new Date(),
      })
      .then(response => {
        if (response.data.counter % 3 === 0) {
          console.log('divisivel', response.data.counter);
          postCoupon();
        }
      })
      .catch(() => {});
  };

  const postCoupon = async () => {
    await axios
      .post('http://192.168.0.65:9001/develfood', {
        percentage: 12,
        restaurantId: '2',
        restaurantName: 'Dale Boca',
        userId: '12',
        createdAt: new Date(),
      })
      .then(() => {});
  };

  function handleCheckout() {
    function CheckoutUserSuccess(data: string) {
      data && navigation.navigate('CheckoutSuccess' as never);
      postOrder();
      setTimeout(() => {
        clearCart();
      }, 2000);
    }
    userRequestCheckout(CheckoutUserSuccess);
  }

  return (
    <CheckoutButton
      onPress={() => handleCheckout()}
      disabled={loading}
      activeOpacity={0.95}>
      <Container>
        {loading ? (
          <Load />
        ) : (
          <>
            <View>
              <DollarIcon source={theme.icons.dollar} />
            </View>
            <View2>
              <EndOrder>Finalizar Pedido</EndOrder>
            </View2>
            <View3>
              <TotalPrice>R$ {priceFormatted}</TotalPrice>
            </View3>
          </>
        )}
      </Container>
    </CheckoutButton>
  );
}
