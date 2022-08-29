import React from 'react';
import {
  Container,
  LeftWrapper,
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
      </LeftWrapper>
      <Percentage>{percentage}%</Percentage>
    </Container>
  );
}
