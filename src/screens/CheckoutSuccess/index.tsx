import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {BackButton} from '../../components/BackButton';
import {ContinueButton} from '../../components/ContinueButton';
import {
  Container,
  Header,
  Title,
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
        translucent
        backgroundColor={theme.colors.background_red}
      />
      <Header>
        <BackButton name="exitWhite" onPressed={handlerBackHome} />
        <Title>Checkout</Title>
      </Header>

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
