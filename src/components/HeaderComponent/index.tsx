import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {StyleProps} from 'react-native-reanimated';
import {BackButton, Container, TextView, Title, Icon} from './styles';

interface Props {
  backgroudColor: string;
  name: string;
  onPress?: () => void;
  source?: ImageSourcePropType;
  Textcolor?: string;
  iconColor?: string;
  animatedStyle?: StyleProps;
}

export function HeaderComponent({
  backgroudColor,
  name,
  onPress,
  source,
  Textcolor,
  iconColor,
  animatedStyle,
}: Props) {
  return (
    <Container style={{backgroundColor: backgroudColor}}>
      <BackButton onPress={onPress}>
        <Icon style={{tintColor: iconColor}} source={source!} />
      </BackButton>
      <TextView>
        <Title style={[animatedStyle, {color: Textcolor}]}>{name}</Title>
      </TextView>
    </Container>
  );
}
