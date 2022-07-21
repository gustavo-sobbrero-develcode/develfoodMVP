import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Container, DevsImage, Title, WrapperDevs, WrapperImage} from './styles';

interface Props {
  name: string;
  source: ImageSourcePropType;
}

export function DevsComponent({name, source}: Props) {
  return (
    <WrapperDevs horizontal={true} showsHorizontalScrollIndicator={false}>
      <Container>
        <Title>{name}</Title>

        <WrapperImage>
          <DevsImage source={source} />
        </WrapperImage>
      </Container>
    </WrapperDevs>
  );
}
