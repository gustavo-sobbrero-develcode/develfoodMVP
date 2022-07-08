import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: ${RFValue(56)}px;
  top: ${RFValue(22)}px;
`;

export const FavoriteIconWrapper = styled.View`
  width: ${RFValue(42)}px;
  height: ${RFValue(42)}px;
  position: absolute;
  right: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.TouchableOpacity``;

export const FavoriteIcon = styled.Image`
  width: ${RFValue(26)}px;
  height: ${RFValue(22)}px;
  border-color: ${({theme}) => theme.colors.icon_red};
`;

export const WrapperRestaurantInfo = styled.View`
  width: 100%;
  height: ${RFValue(99)}px;
  top: ${RFValue(22)}px;
  padding-left: ${RFValue(21)}px;
  padding-top: ${RFValue(13)}px;
  flex-direction: row;
  border-bottom: ${RFValue(10)}px;
`;

export const WrapperRestaurantTypes = styled.View``;

export const NameRestaurant = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const TypeFood = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const WrapperPhoto = styled.View`
  position: absolute;
  right: ${RFValue(14)}px;
`;

export const RestaurantPhoto = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(50)}px;
`;

export const Content = styled.View`
  padding: 0 ${RFValue(20)}px;
`;

export const LineBetween = styled.View`
  width: ${RFValue(321)}px;
  height: ${RFValue(2)}px;
  background-color: #f0f0f5;
  margin-left: ${RFValue(20)}px;
  margin-bottom: ${RFValue(18)}px;
`;

export const PlatesWrapper = styled.View`
  padding: 0 ${RFValue(20)}px;
`;

export const PlatesList = styled.FlatList``;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
  margin-bottom: ${RFValue(18)}px;
`;
