import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  width: 100%;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.text_dark};
  align-self: flex-start;
  margin-left: ${RFValue(11)}px;
`;
