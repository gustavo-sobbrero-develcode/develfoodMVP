import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: ${RFValue(12)}px;
  border: ${RFValue(2)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${({theme}) => theme.colors.text_gray};
`;

export const LoginIcon = styled.Image`
  margin-left: ${RFValue(10)}px;
`;

export const InputLogin = styled.TextInput`
  margin-left: ${RFValue(5)}px;
  width: 88%;
  font-size: ${RFValue(14)}px;
`;

export const IconPassword = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(22)}px;
`;

export const Error = styled.Text`
  align-self: center;
  margin-bottom: ${RFValue(8)}px;
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.background_red};
`;

export const LogoHide = styled.Image``;
