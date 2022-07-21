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
} from './styles';

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

  function handleCheckout() {
    function CheckoutUserSuccess(data: string) {
      data && navigation.navigate('CheckoutSuccess' as never);
      setTimeout(() => {
        clearCart();
      }, 2000);
    }
    userRequestCheckout(CheckoutUserSuccess);
  }

  return (
    <CheckoutButton
      onPress={() => handleCheckout()}
      disable={loading}
      activeOpacity={0.95}>
      <Container>
        {loading ? (
          <Load />
        ) : (
          <>
            <DollarIcon source={theme.icons.dollar} />
            <EndOrder>Finalizar Pedido</EndOrder>
            <TotalPrice>R$ {priceFormatted}</TotalPrice>
          </>
        )}
      </Container>
    </CheckoutButton>
  );
}
