import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
`;

export const SuccessTitle = styled.Text`
  font-size: ${RFValue(28)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text_dark};
  top: ${RFValue(80)}px;
`;

export const ImageSuccess = styled.Image`
  top: ${RFValue(100)}px;
`;
export const WrapperSuccesText = styled.View`
  width: ${RFValue(273)}px;
  height: ${RFValue(50)}px;
  top: ${RFValue(120)}px;
  left: ${RFValue(17)}px;
`;

export const SuccessMessage = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const Content = styled.View`
  width: 100%;
  top: ${RFValue(120)}px;
  padding: 0 ${RFValue(40)}px;
`;
