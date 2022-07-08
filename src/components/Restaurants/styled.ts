import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity``;

export const Container = styled.View.attrs({
  elevation: 10,
})`
  width: ${RFValue(156)}px;
  height: ${RFValue(173)}px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(8)}px;
`;

export const RestaurantImage = styled.Image`
  width: ${RFValue(156)}px;
  height: ${RFValue(127)}px;
  border-top-left-radius: ${RFValue(8)}px;
  border-top-right-radius: ${RFValue(8)}px;
`;

export const FavoriteIconWrapper = styled.View`
  width: ${RFValue(45)}px;
  height: ${RFValue(45)}px;
  position: absolute;
  right: 0;
  top: 0;
  border: ${RFValue(1)}px;
  border-color: ${({theme}) => theme.colors.favorite_border};
  border-top-right-radius: ${RFValue(8)}px;
  border-bottom-left-radius: ${RFValue(16)}px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const IconButton = styled.TouchableOpacity`
  width: ${RFValue(42)}px;
  height: ${RFValue(44)}px;
  margin-top: ${RFValue(10)}px;
  align-items: center;
`;

export const FavoriteIcon = styled.Image`
  width: ${RFValue(25)}px;
  height: ${RFValue(22)}px;
  border-color: ${({theme}) => theme.colors.icon_red};
`;

export const Content = styled.View`
  width: 100%;
  padding: 0 ${RFValue(12)}px;
  height: ${RFValue(69)}px;
  background-color: ${({theme}) => theme.colors.background};
  position: absolute;
  bottom: 0;
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const TitleWrapper = styled.View`
  width: 100%;
  box-sizing: 100%;
`;

export const Title = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  margin-top: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Description = styled.View`
  margin-right: ${RFValue(12)}px;
  margin-top: ${RFValue(5)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryMed};
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const Avaliation = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StarRatio = styled.Image``;

export const NumberRatio = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryMed};
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.icon_red};
  margin-left: ${RFValue(5)}px;
`;
