import React from 'react';
import {
  Container,
  LeftWrapper,
  // NavigateButton,
  // ButtonLabel,
  Percentage,
  RestaurantName,
  Description,
} from './styles';

interface CouponProps {
  id: number;
  restaurantName: string;
  percentage: number;
}

export function CouponCard({restaurantName, percentage}: CouponProps) {
  return (
    <Container>
      <LeftWrapper>
        <Description>
          Cupom de desconto
          <RestaurantName> {restaurantName}</RestaurantName>
        </Description>
        {/* <NavigateButton onPress={navigateToHome}>
          <ButtonLabel>Ativar e ir para o restaurante</ButtonLabel>
        </NavigateButton> */}
      </LeftWrapper>
      <Percentage>{percentage}%</Percentage>
    </Container>
  );
}
