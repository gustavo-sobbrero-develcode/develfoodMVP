import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {Container, Title} from './styles';

interface ListEmptyComponentProps {
  title: string;
  source: ImageSourcePropType;
}

export function ListEmptyComponent({source, title}: ListEmptyComponentProps) {
  return (
    <Container>
      <Image source={source} />
      <Title>{title}</Title>
    </Container>
  );
}
