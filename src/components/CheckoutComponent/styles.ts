import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(40)}px;
  position: absolute;
  background-color: ${({theme}) => theme.colors.background_red};
  border-radius: ${RFValue(6)}px;
  flex-direction: row;
  align-items: center;
  bottom: ${RFValue(10)}px;
  justify-content: space-between;
`;

export const CheckoutButton = styled.TouchableOpacity`
  margin: 0 ${RFValue(9)}px;
`;

export const DollarIcon = styled.Image`
  margin-left: ${RFValue(14)}px;
`;

export const EndOrder = styled.Text`
  color: ${({theme}) => theme.colors.text_white};
  font-weight: 400;
  font-size: ${RFValue(12)}px;
`;

export const TotalPrice = styled.Text`
  color: ${({theme}) => theme.colors.text_white};
  font-weight: 400;
  font-size: ${RFValue(12)}px;
  right: ${RFValue(15)}px;
`;
