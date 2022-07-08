import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const Hamburger = styled.Image`
  position: absolute;
  left: 0;
  top: 0;
`;

export const HalfPizza = styled.Image`
  position: absolute;
  right: 0;
  top: 0;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 ${RFValue(36)}px;
  margin-top: ${RFValue(190)}px;
  background-color: transparent;
  z-index: 1;
  align-items: center;
`;

export const LogoImage = styled.Image`
  align-self: center;
  margin-bottom: ${RFValue(8)}px;
`;

export const FogotPassButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: ${RFValue(0)}px;
  margin-top: ${RFValue(0)}px;
`;

export const ForgotPass = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  margin-top: ${RFValue(0)}px;
`;

export const WrapperRegister = styled.View`
  margin-top: ${RFValue(16)}px;
  flex-direction: row;
  justify-content: center;
  padding: 0 ${RFValue(20)}px;
  z-index: 1;
`;

export const RegisterSimpleTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_login};
`;

export const RegisterButtonTitle = styled.TouchableOpacity``;

export const ButtonTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-weight: bold;
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.background_red};
`;

export const FooterImage = styled.Image`
  position: absolute;
  bottom: 0;
`;
