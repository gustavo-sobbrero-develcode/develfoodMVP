import theme from '@global/styles/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
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

export const PlateInfoWrapper = styled.View`
  width: ${RFValue(312)}px;
  align-self: center;
  margin-top: ${RFValue(24)}px;
`;
export const PlatePhoto = styled.Image`
  width: ${RFValue(200)}px;
  height: ${RFValue(150.18)}px;
  border-radius: ${RFValue(10)}px;
  align-self: center;
`;
export const PlateName = styled.Text`
  font-weight: 500;
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text_dark};
  margin-top: ${RFValue(20)}px;
  width: ${RFValue(298)}px;
`;

export const ViewScroll = styled.View`
  flex: 1;
`;
export const FoodType = styled.Text`
  text-transform: capitalize;
  font-weight: 400;
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_gray};
  margin-top: ${RFValue(-4)}px;
  width: ${RFValue(149)}px;
`;

export const Description = styled.Text`
  font-weight: 400;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_dark};
  margin-top: ${RFValue(32)}px;
  width: ${RFValue(298)}px;
  line-height: ${RFValue(16.41)}px;
`;
export const RestaurantWrapper = styled.View`
  width: 100%;
  height: ${RFValue(49)}px;
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-top: ${RFValue(24)}px;
  border: ${RFValue(0.5)}px;
  border-radius: ${RFValue(6)}px;
  border-color: ${({theme}) => theme.colors.text_gray};
`;
export const RestaurantIcon = styled.Image`
  width: ${RFValue(18)}px;
  height: ${RFValue(18)}px;
  left: ${RFValue(14)}px;
`;
export const RestaurantName = styled.Text`
  font-weight: 400;
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_gray};
  width: ${RFValue(250)}px;
  line-height: ${RFValue(14.06)}px;
  left: ${RFValue(30)}px;
`;

export const ViewCart = styled.View`
  background-color: ${theme.colors.background_red};
  width: 100%;
  height: ${RFValue(55)}px;
  position: absolute;
  bottom: 0px;
  border-top-left-radius: ${RFValue(8)}px;
  border-top-right-radius: ${RFValue(8)}px;
  direction: row;
  justify-content: center;
`;
export const PlateTotalPrice = styled.Text`
  color: ${theme.colors.icon_white};
  font-weight: 700;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(18.75)}px;
  position: absolute;
  left: ${RFValue(35)}px;
`;

export const WrapperCartButton = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: ${RFValue(75)}px;
  right: ${RFValue(25)}px;
`;

export const AddQuantityButtonLabel = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.text_white};
  font-weight: 700;
`;
export const AddQuantityButton = styled.TouchableOpacity`
  width: ${RFValue(25)}px;
  position: absolute;
  margin-left: ${RFValue(75)}px;
  justify-content: center;
`;

export const RemoveQuantityButtonLabel = styled.Text`
  color: ${({theme}) => theme.colors.text_white};
  font-size: ${RFValue(21)}px;
  font-weight: 700;
`;

export const RemoveCartButton = styled.TouchableOpacity`
  width: ${RFValue(25)}px;
  position: absolute;
  margin-left: ${RFValue(25)}px;
`;

export const NumberOfQuantityWrapper = styled.View`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  background-color: ${({theme}) => theme.colors.background_red};
  border-radius: ${RFValue(4)}px;
  align-items: center;
  justify-content: center;
  margin-left: ${RFValue(45)}px;
  border: ${RFValue(1)}px;
  border-color: ${({theme}) => theme.colors.text_white};
`;

export const Number = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_white};
`;

export const RemoveQuantityButtonImage = styled.Image`
  width: ${RFValue(12)}px;
  height: ${RFValue(5)}px;
`;

export const LitterButton = styled.TouchableOpacity`
  justify-content: center;
  position: absolute;
  margin-left: ${RFValue(22)}px;
  width: ${RFValue(25)}px;
  height: ${RFValue(25)}px;
`;

export const LitterImage = styled.Image`
  width: ${RFValue(14)}px;
  height: ${RFValue(14)}px;
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(27)}px;
`;

export const TextButton = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(18.75)}px;
  color: ${({theme}) => theme.colors.text_white};
`;
