import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const HeaderView = styled.View`
  margin-left: ${RFValue(-5)}px;
`;

export const Separator = styled(Animated.View)`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors.separator};
`;

export const HeartButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  right: 19px;
  top: 21px;
`;

export const WrapperRestaurantInfo = styled.View`
  width: 100%;
  height: ${RFValue(99)}px;
  padding-left: ${RFValue(21)}px;
  padding-top: ${RFValue(20)}px;
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
  top: ${RFValue(9)}px;
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
