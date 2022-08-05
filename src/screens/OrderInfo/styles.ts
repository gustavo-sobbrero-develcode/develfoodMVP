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

export const PinImage = styled.Image`
  position: absolute;
  z-index: 1;
  margin: ${RFValue(35)}px ${RFValue(35)}px;
`;

export const MapImage = styled.Image`
  width: ${RFValue(54)}px;
  height: ${RFValue(54)}px;
`;

export const WrapperAddresInfo = styled.View`
  left: ${RFValue(10)}px;
  width: 60%;
  height: ${RFValue(54)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const Street = styled.Text`
  font-size: ${RFValue(13)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Neighborhood = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const DateCard = styled.View`
  width: ${RFValue(54)}px;
  height: ${RFValue(54)}px;
  border: ${RFValue(2)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${({theme}) => theme.colors.background_red};
  top: ${RFValue(15)}px;
  right: ${RFValue(15)}px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const Day = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.icon_red};
`;

export const Month = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.icon_red};
`;

export const WrapperRestaurantInfo = styled.View`
  left: ${RFValue(16)}px;
  flex-direction: row;
`;

export const RestaurantPhoto = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(50)}px;
`;

export const WrapperName = styled.View`
  left: ${RFValue(5)}px;
  justify-content: center;
`;

export const Restaurant = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const RestaurantName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const WrapperOrderInfo = styled.View`
  position: absolute;
  right: ${RFValue(25)}px;
  align-items: center;
`;

export const StatusImage = styled.Image``;

export const WrapperText = styled.View`
  width: ${RFValue(85)}px;
  height: ${RFValue(33)}px;
  align-items: center;
`;

export const StatusText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  text-align: center;
  color: ${({theme}) => theme.colors.icon_red};
`;

export const WrapperPlates = styled.View`
  width: 90%;
  height: 100%;
  top: ${RFValue(250)}px;
  margin-right: ${RFValue(30)}px;
  padding-top: ${RFValue(27)}px;
  border-top-right-radius: ${RFValue(60)}px;
  position: absolute;
  align-items: center;
  background-color: ${({theme}) => theme.colors.card};
`;

export const WrapperCartPlates = styled.View`
  width: 90%;
  margin-left: 5%;
`;

export const LineBetween = styled.View`
  width: ${RFValue(321)}px;
  height: ${RFValue(2)}px;
  top: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.line};
  margin-left: ${RFValue(20)}px;
`;

export const TotalValueWrapper = styled.View`
  width: 32.8%;
  height: 6.1%;
  position: absolute;
  margin: ${RFValue(19)}px 0;
  left: ${RFValue(16)}px;
  padding: ${RFValue(5)}px ${RFValue(7)}px;
  align-items: center;
  background-color: ${({theme}) => theme.colors.priceView};
  border-radius: ${RFValue(6)}px;
`;

export const TotalText = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_light};
`;

export const WrapperPrice = styled.View`
  flex-direction: row;
`;

export const R$Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_light};
  margin-right: ${RFValue(5)}px;
`;

export const TotalValue = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_light};
`;
