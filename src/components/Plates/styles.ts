import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface CartStyleProps {
  insideCart: number;
}

export const ContentContainer = styled.View`
  width: 100%;
  height: ${RFValue(103)}px;
  background-color: ${({theme}) => theme.colors.cardRemove};
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(18)}px;
`;

export const Container = styled.View.attrs({
  elevation: 10,
})`
  width: 100%;
  height: ${RFValue(103)}px;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(18)}px;
  border-radius: ${RFValue(8)}px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const WrapperImage = styled.View`
  left: ${RFValue(5)}px;
  margin: ${RFValue(5)}px;
`;

export const PlateImage = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: ${RFValue(8)}px;
`;

export const WrapperPlateInfo = styled.View`
  position: absolute;
  top: ${RFValue(10)}px;
  left: ${RFValue(95)}px;
  right: ${RFValue(20)}px;
`;

export const PlateTitleWrapper = styled.View`
  width: 80%;
  height: ${RFValue(60)}px;
`;

export const PlateTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  text-align: justify;
  font-weight: 500;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.icon_red};
`;

export const PlateInfo = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const FavoriteButton = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(9)}px;
  top: ${RFValue(8)}px;
`;
export const FavoriteImage = styled.Image`
  width: ${RFValue(18)}px;
  height: ${RFValue(16)}px;
`;

export const WrapperAdvancedInfo = styled.View`
  width: 110%;
  height: ${RFValue(30)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PriceWrapper = styled.View`
  width: ${RFValue(100)}px;
`;

export const Price = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const AddButton = styled.TouchableOpacity`
  width: ${RFValue(100)}px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.icon_red};
`;

export const RemoveButton = styled.TouchableOpacity``;

export const WrapperCartButton = styled.View`
  width: 40%;
  height: ${RFValue(30)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const AddQuantityButton = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: RFValue(30),
    bottom: RFValue(30),
    left: RFValue(10),
    right: RFValue(30),
  },
})`
  width: 30%;
  align-items: center;
  justify-content: center;
`;

export const AddQuantityButtonLabel = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.background_red};
  font-weight: 700;
`;

export const RemoveCartButton = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: RFValue(30),
    bottom: RFValue(30),
    left: RFValue(30),
    right: RFValue(30),
  },
})`
  width: 30%;
  align-items: center;
`;

export const RemoveQuantityButtonLabel = styled.Text`
  color: ${({theme}) => theme.colors.background_red};
  font-size: ${RFValue(21)}px;
  font-weight: 700;
`;

export const NumberOfQuantityWrapper = styled.View`
  width: 25%;
  height: 80%;
  background-color: ${({theme}) => theme.colors.background_red};
  border-radius: ${RFValue(4)}px;
  align-items: center;
  justify-content: center;
`;

export const Number = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_white};
`;

export const LitterButton = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: RFValue(30),
    bottom: RFValue(30),
    left: RFValue(30),
    right: RFValue(30),
  },
})`
  width: 30%;
  align-items: center;
`;

export const LitterImage = styled.Image`
  width: ${RFValue(15)}px;
  height: ${RFValue(15)}px;
`;

export const CleanUpWrapper = styled.View`
  background-color: red;
  position: absolute;
  border-radius: ${RFValue(8)}px;
  height: ${RFValue(103)}px;
  width: ${RFValue(100)}px;
  align-items: center;
  justify-content: center;
`;

export const CleanUpButton = styled.TouchableOpacity``;

export const CleanUpImage = styled.Image`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
`;

export const CleanUpTitle = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_white};
  font-weight: 400;
`;

export const PlateButton = styled.TouchableOpacity``;
