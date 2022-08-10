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
