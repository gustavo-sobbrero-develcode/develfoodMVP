import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export interface CartStyleProps {
  bottom: number;
}

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(40)}px;
  position: absolute;
  background-color: ${({theme}) => theme.colors.background_red};
  border-radius: ${RFValue(6)}px;
  flex-direction: row;
  align-items: center;
`;

export const WrapperCartComponent = styled.TouchableOpacity`
  margin: 0 ${RFValue(9)}px;
  bottom: ${(props: CartStyleProps) => (props.bottom ? props.bottom : 10)}px;
`;

export const BasketImage = styled.Image`
  position: absolute;
  left: ${RFValue(17)}px;
  width: ${RFValue(18)}px;
  height: ${RFValue(14)}px;
  bottom: ${RFValue(12)}px;
`;

export const WrapperImage = styled.View`
  position: absolute;
  left: ${RFValue(10)}px;
  top: ${RFValue(10)}px;
  flex-direction: row;
`;

export const ItemsCircle = styled.View`
  left: ${RFValue(17)}px;
  width: ${RFValue(12)}px;
  height: ${RFValue(12)}px;
  border-radius: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const CartItems = styled.Text`
  color: ${({theme}) => theme.colors.background_red};
  font-size: ${RFValue(8)}px;
  font-weight: 700;
`;

export const GoToCart = styled.View`
  width: ${RFValue(100)}px;
  height: ${RFValue(40)}px;
`;

export const ShowCart = styled.Text`
  left: ${RFValue(143)}px;
  color: ${({theme}) => theme.colors.text_white};
  font-weight: 400;
  font-size: ${RFValue(12)}px;
  top: ${RFValue(10)}px;
`;

export const TotalPrice = styled.Text`
  left: ${RFValue(170)}px;
  color: ${({theme}) => theme.colors.text_white};
  font-weight: 400;
  font-size: ${RFValue(12)}px;
`;
