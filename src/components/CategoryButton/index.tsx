import React from 'react';
import {TextProps} from 'react-native';
import {RectButtonProps} from 'react-native-gesture-handler';
import {Container, Title} from './styles';
interface Props {
  title: string;
  onPress: () => void;
  style: RectButtonProps['style'];
  textStyle: TextProps['style'];
}

export function Category({title, style, textStyle, onPress, ...rest}: Props) {
  return (
    <Container onPress={onPress} activeOpacity={1} {...rest} style={style}>
      <Title style={textStyle}>{title}</Title>
    </Container>
  );
}
