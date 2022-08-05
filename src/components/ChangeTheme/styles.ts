import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: ${RFValue(30)}px;
  position: absolute;
  z-index: 1;
  right: ${RFValue(15)}px;
  top: ${RFValue(15)}px;
  width: 92px;
`;

export const Content = styled.TouchableOpacity`
  height: ${RFValue(30)}px;
  width: ${RFValue(30)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: ${RFValue(15)}px;
  top: ${RFValue(15)}px;
`;

export const ModalizeContent = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const LightCircle = styled.View`
  height: ${RFValue(20)}px;
  width: ${RFValue(20)}px;
  border-radius: ${RFValue(15)}px;
  background-color: ${({theme}) => theme.colors.theme_button_circle};
`;
export const DarkContent = styled.View`
  align-items: flex-end;
`;
export const DarkCircle = styled.TouchableOpacity`
  height: ${RFValue(20)}px;
  width: ${RFValue(20)}px;
  border-radius: ${RFValue(15)}px;
  background-color: ${({theme}) => theme.colors.theme_button_circle};
`;
