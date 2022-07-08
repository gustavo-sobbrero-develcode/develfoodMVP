import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTheme} from 'styled-components';
import {useCreateCart} from '../../global/Context/Cart';
import {
  Container,
  CheckoutButton,
  DollarIcon,
  EndOrder,
  TotalPrice,
} from './styles';

export function CheckoutComponent() {
  const theme = useTheme();

  const navigation = useNavigation();

  const {total, userRequestCheckout, clearCart} = useCreateCart();

  function priceConverter() {
    const priceWZeros = parseFloat(total.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }
  const priceFormatted = priceConverter();

  function handleCheckout() {
    function CheckoutUserSuccess(data: string) {
      data && navigation.navigate('CheckoutSuccess' as never);
      clearCart();
    }
    userRequestCheckout(CheckoutUserSuccess);
  }

  return (
    <CheckoutButton onPress={() => handleCheckout()}>
      <Container>
        <DollarIcon source={theme.icons.dollar} />
        <EndOrder>Finalizar Pedido</EndOrder>
        <TotalPrice>R$ {priceFormatted}</TotalPrice>
      </Container>
    </CheckoutButton>
  );
}
