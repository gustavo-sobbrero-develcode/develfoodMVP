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

export const View = styled.View`
  flex: 1;
  align-items: flex-start;
`;

export const View2 = styled.View`
  flex: 1;
  align-items: center;
`;

export const View3 = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const DollarIcon = styled.Image`
  margin-left: ${RFValue(14)}px;
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
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

export const Load = styled.ActivityIndicator.attrs({
  color: '#FFFFFF',
})`
  width: 100%;
  align-self: center;
`;
