/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';

import {ButtonIcon, WrapperIcon, Title, IconImage} from './styles';
interface Props {
  source: ImageSourcePropType;
  name: string;
  isPressed: boolean;
  onPressed: Function;
}

export function TabBarButton({source, name, isPressed, onPressed}: Props) {
  const theme = useTheme();
  return (
    <WrapperIcon>
      <ButtonIcon onPress={() => onPressed()}>
        <IconImage
          source={source}
          style={{
            tintColor: isPressed
              ? theme.colors.icon_red
              : theme.colors.icon_gray,
            height: isPressed ? RFValue(25) : RFValue(25),
            width: isPressed ? RFValue(30) : RFValue(22),
            resizeMode: 'contain',
          }}
        />
      </ButtonIcon>
      {isPressed ? <Title /> : <Title>{name}</Title>}
    </WrapperIcon>
  );
}
