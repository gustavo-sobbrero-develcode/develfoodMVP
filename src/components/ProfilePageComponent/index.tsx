import React from 'react';
import {
  ArrowImage,
  Button,
  ButtonText,
  Container,
  Icon,
  Wrapper,
} from './styles';

interface Props {
  onPress: () => void;
  sourceIcon: string;
  name: string;
  sourceArrowIcon: string;
}

export function ProfilePageComponent({
  onPress,
  sourceIcon,
  name,
  sourceArrowIcon,
}: Props) {
  return (
    <Container>
      <Button onPress={onPress}>
        <Icon source={sourceIcon} />
        <Wrapper>
          <ButtonText>{name}</ButtonText>
          <ArrowImage source={sourceArrowIcon} />
        </Wrapper>
      </Button>
    </Container>
  );
}
