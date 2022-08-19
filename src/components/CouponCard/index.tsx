import {useNavigation} from '@react-navigation/native';
import React from 'react';
// import {useTheme} from 'styled-components';
import {
  Container,
  LeftWrapper,
  NavigateButton,
  ButtonLabel,
  Percentage,
  RestaurantName,
  Description,
} from './styles';

interface CouponProps {
  id: number;
  restaurantName: string;
  percentage: number;
}

export function CouponCard({id, restaurantName, percentage}: CouponProps) {
  // const theme = useTheme();

  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <Container>
      <LeftWrapper>
        <Description>
          Cupom de desconto
          <RestaurantName> {restaurantName}</RestaurantName>
        </Description>
        <NavigateButton onPress={navigateToHome}>
          <ButtonLabel>Ativar e ir para o restaurante</ButtonLabel>
        </NavigateButton>
      </LeftWrapper>
      <Percentage>{percentage}%</Percentage>
    </Container>
  );
}
