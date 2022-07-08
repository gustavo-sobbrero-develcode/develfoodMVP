import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const WrapperInfo = styled.View`
  width: 100%;
  padding: ${RFValue(16)}px ${RFValue(16)}px;
  flex-direction: row;
`;

export const MapImage = styled.Image`
  width: ${RFValue(54)}px;
  height: ${RFValue(54)}px;
`;

export const WrapperAddresInfo = styled.View`
  left: ${RFValue(10)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const Street = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Neighborhood = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Content = styled.View`
  margin: 0 ${RFValue(16)}px;
`;

export const LineBetween = styled.View`
  width: 100%;
  height: ${RFValue(2)}px;
  background-color: #f0f0f5;
`;

export const WrapperInfoRestaurant = styled.View`
  top: ${RFValue(20)}px;
`;

export const RestauratName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 400;
  top: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const FoodType = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  top: ${RFValue(15)}px;
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

export const WrapperPlates = styled.View`
  width: 90%;
  height: 100%;
  top: ${RFValue(280)}px;
  margin-left: ${RFValue(30)}px;
  padding-top: ${RFValue(27)}px;
  border-top-left-radius: ${RFValue(60)}px;
  position: absolute;
  align-items: center;
  background-color: ${({theme}) => theme.colors.card};
`;

export const TitleCart = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
  margin-bottom: ${RFValue(29)}px;
`;

export const CartList = styled.FlatList`
  width: 90%;
  margin-left: 10%;
  margin-top: ${RFValue(120)}px;
`;

export const WrapperCartPlates = styled.View`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
`;

export const FooterComponent = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;
`;
