import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export interface CartStyleProps {
  bottom: number;
}

export const Background = styled.View.attrs({
  elevation: 3,
})`
  width: 100%;
  position: absolute;
  height: ${RFValue(55)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background};
  bottom: ${(props: CartStyleProps) => props.bottom && props.bottom}px;
`;

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(40)}px;
  background-color: ${({theme}) => theme.colors.background_red};
  border-radius: ${RFValue(6)}px;
`;

export const Padding = styled.View`
  align-self: center;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  height: ${RFValue(40)}px;
  flex-direction: row;
`;

export const BasketWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: ${RFValue(10)}px;
`;

export const WrapperCartComponent = styled.TouchableOpacity``;

export const BasketImage = styled.Image`
  width: ${RFValue(20)}px;
  height: ${RFValue(17)}px;
`;

export const View = styled.View`
  flex: 1;
  align-items: flex-start;
`;

export const View2 = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const View3 = styled.View`
  flex: 1;
  align-items: flex-end;
  margin-right: ${RFValue(10)}px;
`;

export const WrapperImage = styled.View`
  flex-direction: row;
`;

export const ItemsCircle = styled.View`
  position: absolute;
  width: ${RFValue(12)}px;
  height: ${RFValue(12)}px;
  border-radius: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
  justify-content: center;
  bottom: ${RFValue(9)}px;
  left: ${RFValue(6)}px;
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
  color: ${({theme}) => theme.colors.text_white};
  font-weight: 400;
  font-size: ${RFValue(12)}px;
`;

export const TotalPrice = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${({theme}) => theme.colors.text_white};
  font-weight: 400;
  font-size: ${RFValue(12)}px;
`;
