import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(56)}px;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_dark};
  font-weight: 500;
  text-align: center;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  margin-left: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
`;

export const TextView = styled.View`
  width: 100%;
  position: absolute;
  align-items: center;
`;

export const Icon = styled.Image`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
`;
