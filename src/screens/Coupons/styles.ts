import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const FooterHeight = Dimensions.get('window').height * 0.29;

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
`;

export const Footer = styled.View`
  height: ${FooterHeight}px;
  background-color: ${({theme}) => theme.colors.background};
  top: ${RFValue(50)}px;
`;
