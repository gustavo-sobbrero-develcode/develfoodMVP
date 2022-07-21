import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Container, DevsImage, Title, WrapperImage, WrapperName} from './styles';

interface Props {
  name: string;
  source: ImageSourcePropType;
}

export function DevsComponent({name, source}: Props) {
  return (
    <Container>
      <WrapperName>
        <Title>{name}</Title>
      </WrapperName>
      <WrapperImage>
        <DevsImage source={source} />
      </WrapperImage>
    </Container>
  );
}
