import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  elevation: 5,
})`
  width: 100%;
  height: ${RFValue(50)}px;
  align-items: center;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

export const Icon = styled.Image`
  left: ${RFValue(25)}px;
`;

export const ButtonText = styled.Text`
  left: ${RFValue(75)}px;
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const ArrowImage = styled.Image`
  position: absolute;
  left: ${RFValue(320)}px;
`;
