import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export interface CartStyleProps {
  insideCart: number;
}

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

export const PlateTitle = styled.Text`
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

export const WrapperAdvancedInfo = styled.View`
  position: absolute;
  width: 100%;
  top: ${RFValue(62)}px;
  flex-direction: row;
  justify-content: space-between;
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
  right: 0;
`;

export const TextButton = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.icon_red};
`;

export const RemoveButton = styled.TouchableOpacity`
  right: 20;
`;

export const WrapperCartButton = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  left: ${(props: CartStyleProps) =>
    props.insideCart ? props.insideCart : 10}px;
`;

export const AddQuantityButton = styled.TouchableOpacity`
  position: absolute;
  margin-left: ${RFValue(75)}px;
  width: ${RFValue(8)}px;
  height: ${RFValue(16)}px;
  justify-content: center;
`;

export const AddQuantityButtonImage = styled.Image`
  width: ${RFValue(12)}px;
  height: ${RFValue(10)}px;
`;
export const RemoveCartButton = styled.TouchableOpacity`
  justify-content: center;
  position: absolute;
  margin-left: ${RFValue(20)}px;
  width: ${RFValue(15)}px;
  height: ${RFValue(10)}px;
`;

export const RemoveQuantityButtonImage = styled.Image`
  width: ${RFValue(12)}px;
  height: ${RFValue(5)}px;
`;

export const NumberOfQuantityWrapper = styled.View`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  background-color: ${({theme}) => theme.colors.background_red};
  border-radius: ${RFValue(4)}px;
  align-items: center;
  justify-content: center;
  margin-left: ${RFValue(45)}px;
`;

export const Number = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_white};
`;

export const LitterButton = styled.TouchableOpacity`
  justify-content: center;
  position: absolute;
  margin-left: ${RFValue(22)}px;
`;

export const LitterImage = styled.Image`
  width: ${RFValue(14)}px;
  height: ${RFValue(14)}px;
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
