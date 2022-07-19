import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {ContinueButton} from '@components/ContinueButton';
import {HeaderComponent} from '@components/HeaderComponent';
import {
  Container,
  Wrapper,
  SuccessTitle,
  ImageSuccess,
  WrapperSuccesText,
  SuccessMessage,
  Content,
} from './styles';

export function CheckoutSuccess() {
  const theme = useTheme();

  const navigation = useNavigation();

  function handlerBackHome() {
    navigation.navigate('Home' as never);
  }

  function handleShowMyOrders() {
    navigation.navigate('Orders' as never);
  }

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent={false}
        backgroundColor={theme.colors.background_red}
      />

      <HeaderComponent
        name="Checkout"
        Textcolor={theme.colors.background}
        source={theme.icons.exitWhite}
        iconColor={theme.colors.icon_white}
        onPress={handlerBackHome}
        backgroudColor={theme.colors.background_red}
      />

      <Wrapper>
        <SuccessTitle>Pedido Realizado</SuccessTitle>

        <ImageSuccess source={theme.images.checkoutSuccess} />

        <WrapperSuccesText>
          <SuccessMessage>
            Agradecemos a preferência! Em breve você receberá atualizações sobre
            o status do seu pedido!
          </SuccessMessage>
        </WrapperSuccesText>
        <Content>
          <ContinueButton
            title="Ver Pedido"
            onPressed={() => handleShowMyOrders()}
          />
        </Content>
      </Wrapper>
    </Container>
  );
}
