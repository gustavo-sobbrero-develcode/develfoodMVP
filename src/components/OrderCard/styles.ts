import { RectButton } from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton).attrs({
  elevation: 10,
})`
  width: 90%;
  height: ${RFValue(103)}px;
  background-color: ${({theme}) => theme.colors.card};
  border-radius: ${RFValue(8)}px;
  margin-top: ${RFValue(10)}px;
  margin-bottom: ${RFValue(10)}px;
  align-self: center;
`;

export const RestaurantPhoto = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(50)}px;
  left: ${RFValue(14)}px;
  top: ${RFValue(10)}px;
`;

export const WrapperRestaurantInfo = styled.View`
  width: ${RFValue(260)}px;
  height: ${RFValue(66)}px;
  position: absolute;
  top: ${RFValue(16)}px;
  left: ${RFValue(60)}px;
`;

export const RestaurantName = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const CheckOrders = styled.Image`
  width: ${RFValue(12)}px;
  height: ${RFValue(12)}px;
  top: ${RFValue(7)}px;
`;

export const WrapperInfoPoduct = styled.View`
  flex-direction: row;
`;

export const StatusOrder = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_gray};
  left: ${RFValue(18)}px;
  bottom: ${RFValue(6)}px;
`;

export const OrderN = styled.Text`
  left: ${RFValue(25)}px;
  bottom: ${RFValue(6)}px;
  font-size: ${RFValue(10)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const OrderNumber = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
  left: ${RFValue(25)}px;
  bottom: ${RFValue(6)}px;
`;

export const FoodOrderName = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_gray};
  text-align: justify;
  margin-right: ${RFValue(30)}px;
`;
