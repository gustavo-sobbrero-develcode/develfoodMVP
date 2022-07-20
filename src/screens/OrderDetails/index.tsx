import {ListPlatesProps} from '@components/Plates';
import {Text} from '@screens/loginScreens/RegisterSuccess/styles';
import React from 'react';
import {Container} from './styles';

export function OrderDetails({id}: ListPlatesProps) {
  console.log('id nos detalhes', id);

  return (
    <Container>
      <Text style={{fontSize: 50}}>Order</Text>
    </Container>
  );
}
